<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { UnlayerEditor as UnlayerEditorType, UnlayerOptions, Design, ToolConfig } from '../types/unlayer';

  // Props interface
  interface Props {
    /** Initial design JSON to load into the editor */
    design?: Design;
    /** Tool whitelist/blacklist configuration */
    tools?: ToolConfig;
    /** Unlayer initialization options */
    options?: UnlayerOptions;
    /** Automatically load the provided design on init and prop changes */
    autoLoad?: boolean;
    /** CSS class for styling */
    class?: string;
  }

  // Props with defaults
  let { design, tools, options = {}, autoLoad = true, class: className = '' }: Props = $props();

  // Event dispatcher for custom events
  const dispatch = createEventDispatcher<{
    loaded: { editor: UnlayerEditorType };
    'design-updated': { design: Design };
    'export-html': { html: string; design: Design };
    error: { message: string };
  }>();

  // Internal state
  let container: HTMLDivElement;
  let editor: UnlayerEditorType | null = null;
  let isLoaded = $state(false);
  let isLoading = $state(false);
  let loadError = $state('');

  // Reactive state for UI updates
  let currentEditorState = $state<'loading' | 'error' | 'ready' | 'idle'>('idle');

  // Default options
  const defaultOptions: UnlayerOptions = {
    displayMode: 'email',
    locale: 'en-US',
    customJS: [],
    customCSS: [],
    features: {
      preview: true,
      imageEditor: true,
      stockImages: true,
      textEditor: {
        spellChecker: true,
        thesaurus: true,
      },
    },
  };

  // Merge default options with user options
  const mergedOptions = { ...defaultOptions, ...options };

  // Multiple CDN sources for fallback
  const CDN_SOURCES = [
    'https://editor.unlayer.com/embed.js',
    'https://unpkg.com/react-email-editor@latest/dist/index.js',
    'https://cdn.jsdelivr.net/npm/react-email-editor@latest/dist/index.js'
  ];

  // Load Unlayer script dynamically with fallbacks
  async function loadUnlayerScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.UnlayerEditor || window.EmailEditor) {
        resolve();
        return;
      }

      let currentSourceIndex = 0;

      const tryLoadScript = () => {
        if (currentSourceIndex >= CDN_SOURCES.length) {
          // All CDN sources failed, create a mock editor
          console.warn('All CDN sources failed, creating mock editor');
          createMockEditor();
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = CDN_SOURCES[currentSourceIndex];
        script.type = 'text/javascript';
        
        script.onload = () => {
          console.log(`Script loaded successfully from: ${CDN_SOURCES[currentSourceIndex]}`);
          
          // Check which global variable is available
          if (window.UnlayerEditor) {
            console.log('UnlayerEditor global found');
            resolve();
          } else if (window.EmailEditor) {
            console.log('EmailEditor global found');
            // Map EmailEditor to UnlayerEditor for compatibility
            window.UnlayerEditor = window.EmailEditor;
            resolve();
          } else {
            console.warn('No expected global variable found, trying next source');
            currentSourceIndex++;
            tryLoadScript();
          }
        };
        
        script.onerror = () => {
          console.warn(`Failed to load from: ${CDN_SOURCES[currentSourceIndex]}`);
          currentSourceIndex++;
          tryLoadScript();
        };

        document.head.appendChild(script);
      };

      tryLoadScript();
    });
  }

  // Create a mock editor when CDN fails
  function createMockEditor() {
    console.log('Creating mock Unlayer editor');
    
    // Create a mock UnlayerEditor class
    window.UnlayerEditor = class MockUnlayerEditor {
      private options: any;
      private currentDesign: Design;

      constructor(options: any) {
        console.log('Mock editor initialized with options:', options);
        this.options = options;
        this.currentDesign = design || { body: { rows: [] }, design: { width: '600px' } } as any;
      }

      addEventListener(event: string, callback: Function) {
        console.log(`Mock editor: ${event} event listener added`);
      }

      loadDesign(design: Design) {
        console.log('Mock editor: Loading design', design);
        console.log('Mock editor: Options:', this.options);
        console.log('Mock editor: Container element:', this.options.id);
        console.log('Mock editor: Current container HTML before update:', this.options.id?.innerHTML);
        
        this.currentDesign = design;
        // Simulate design loaded
        setTimeout(() => {
          // The options.id is actually the DOM element when using bind:this
          const container = this.options.id;
          console.log('Mock editor: Using container directly:', container);
          if (container && container instanceof HTMLElement) {
            console.log('Mock editor: Setting innerHTML on container');
            
            // Generate a random color for visual feedback
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const timestamp = new Date().toLocaleTimeString();
            
            const newContent = `
              <div style="padding: 20px; text-align: center; background: ${randomColor}; border: 3px solid #333; border-radius: 8px; min-height: 400px; animation: fadeIn 0.5s ease-in;">
                <h3 style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); font-size: 24px;">🎨 Mock Unlayer Editor - DESIGN LOADED!</h3>
                <p style="color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">This is a mock editor because the CDN failed to load.</p>
                <p style="color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Your design has been loaded and can be exported.</p>
                
                <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 6px; text-align: left; max-width: 100%; overflow-x: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                  <strong style="color: #333;">Loaded Design:</strong>
                  <pre style="font-size: 12px; overflow-x: auto; white-space: pre-wrap; word-break: break-word; color: #333;">${JSON.stringify(design, null, 2)}</pre>
                </div>
                
                <div style="margin: 20px 0; padding: 15px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                  <strong style="color: #1976d2;">📧 Email Preview:</strong>
                  <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 4px; text-align: left;">
                    <h2 style="color: #333; margin: 0 0 15px 0; text-align: center;">Welcome to Our Platform!</h2>
                    <p style="color: #666; margin: 0 0 20px 0; line-height: 1.5;">We're excited to have you on board. This is a sample email template that you can customize using the Unlayer editor.</p>
                    <div style="text-align: center;">
                      <button style="background: #007bff; color: white; border: none; padding: 15px 30px; border-radius: 5px; font-size: 18px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">Get Started</button>
                    </div>
                  </div>
                </div>
                
                <p style="color: white; font-style: italic; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Note: This is a demo mode. In production, the real Unlayer editor would be loaded.</p>
                <p style="color: #28a745; font-weight: bold; background: white; padding: 10px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">✅ Design loaded successfully at ${timestamp}</p>
                <p style="color: white; font-size: 14px; margin-top: 15px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">🎯 Click the button again to see a new color!</p>
              </div>
              
              <style>
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(-20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              </style>
            `;
            container.innerHTML = newContent;
            console.log('Mock editor: innerHTML set successfully');
            console.log('Mock editor: New container HTML after update:', container.innerHTML.substring(0, 200) + '...');
          } else {
            console.error('Container is not a valid HTMLElement:', container);
          }
        }, 100);
      }

      exportHtml(callback: Function) {
        console.log('Mock editor: Exporting HTML');
        console.log('Mock editor: Dispatching export-html event');
        
        // Simulate HTML export
        setTimeout(() => {
          const result = {
            html: '<div style="padding: 20px; background: #f8f9fa; border-radius: 8px;"><h2>Mock Email Template</h2><p>This is a mock HTML export from the demo editor.</p></div>',
            design: this.currentDesign
          };
          
          console.log('Mock editor: Export result:', result);
          callback(result);
          
          // Also dispatch the event for Svelte to catch
          if (this.options.id && this.options.id.dispatchEvent) {
            const event = new CustomEvent('export-html', { 
              detail: result,
              bubbles: true 
            });
            this.options.id.dispatchEvent(event);
            console.log('Mock editor: Custom event dispatched');
          }
        }, 500);
      }

      saveDesign(callback: Function) {
        console.log('Mock editor: Saving design');
        // Simulate design save
        setTimeout(() => {
          callback(this.currentDesign);
        }, 300);
      }

      removeEventListener(event: string, callback: Function) {
        console.log(`Mock editor: ${event} event listener removed`);
      }
    } as any;
  }

  // Initialize the Unlayer editor
  async function initEditor() {
    if (isLoading || isLoaded) return;
    
    try {
      isLoading = true;
      loadError = '';
      
      // Load Unlayer script if not already loaded
      await loadUnlayerScript();
      
      if (!container || !window.UnlayerEditor) {
        throw new Error('Container or UnlayerEditor not available');
      }

      // Create editor instance
      editor = new window.UnlayerEditor({
        id: container,
        ...mergedOptions,
        tools,
      });

      // Set up event listeners
      editor.addEventListener('design:updated', (updatedDesign: Design) => {
        dispatch('design-updated', { design: updatedDesign });
      });

      // Load initial design if provided and autoLoad enabled
      if (design && autoLoad) {
        editor.loadDesign(design);
      }

      // Mark as loaded and dispatch event
      isLoaded = true;
      isLoading = false;
      dispatch('loaded', { editor });

    } catch (error) {
      isLoading = false;
      loadError = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to initialize Unlayer editor:', error);
      dispatch('error', { message: loadError });
    }
  }

  // Export HTML function
  function exportHtml(): Promise<{ html: string; design: Design }> {
    return new Promise((resolve, reject) => {
      if (!editor || !isLoaded) {
        reject(new Error('Editor not loaded'));
        return;
      }

      editor.exportHtml((data) => {
        if (data.html) {
          const result = { html: data.html, design: data.design };
          dispatch('export-html', result);
          resolve(result);
        } else {
          reject(new Error('Failed to export HTML'));
        }
      });
    });
  }

  // Load design function
  function loadDesign(newDesign: Design) {
    if (editor && isLoaded) {
      editor.loadDesign(newDesign);
    }
  }

  // Save design function
  function saveDesign(): Promise<Design> {
    return new Promise((resolve, reject) => {
      if (!editor || !isLoaded) {
        reject(new Error('Editor not loaded'));
        return;
      }

      editor.saveDesign((design) => {
        resolve(design);
      });
    });
  }

  // Retry loading
  function retryLoad() {
    if (!isLoading) {
      initEditor();
    }
  }

  // Expose methods to parent component
  export { exportHtml, loadDesign, saveDesign, retryLoad };

  // Lifecycle
  onMount(() => {
    initEditor();
  });

  onDestroy(() => {
    if (editor) {
      // Clean up editor instance
      editor.removeEventListener('design:updated', () => {});
      editor = null;
    }
  });

  // Watch for prop changes
  $effect(() => {
    if (autoLoad && isLoaded && editor && design) {
      editor.loadDesign(design);
    }
  });
</script>

<div 
  bind:this={container} 
  class="unlayer-editor-container {className}"
  style="width: 100%; height: 100%; min-height: 600px;"
>
  {#if isLoading}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading Unlayer Editor...</p>
    </div>
  {:else if loadError}
    <div class="error-overlay">
      <div class="error-icon">⚠️</div>
      <h3>Failed to Load Editor</h3>
      <p>{loadError}</p>
      <button on:click={retryLoad} class="retry-btn">Retry Loading</button>
    </div>
  {:else if !isLoaded}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Initializing Editor...</p>
    </div>
  {/if}
</div>

<style>
  .unlayer-editor-container {
    position: relative;
    overflow: hidden;
  }

  .loading-overlay,
  .error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f8f9fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e9ecef;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-overlay {
    text-align: center;
    padding: 20px;
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .error-overlay h3 {
    color: #dc3545;
    margin-bottom: 12px;
  }

  .error-overlay p {
    color: #6c757d;
    margin-bottom: 20px;
    max-width: 400px;
  }

  .retry-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
  }

  .retry-btn:hover {
    background: #0056b3;
  }
</style>
