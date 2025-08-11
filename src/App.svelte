<script lang="ts">
  import UnlayerEditor from './lib/UnlayerEditor.svelte';
  import type { Design } from './types/unlayer';

  // Sample welcome design
  const welcomeDesign: Design = {
    "body": {
      "rows": [
        {
          "cells": [
            {
              "content": {
                "blocks": [
                  {
                    "type": "text",
                    "data": {
                      "text": "Welcome to Our Platform!",
                      "textAlign": "center",
                      "fontSize": "32px",
                      "fontWeight": "bold",
                      "color": "#333333",
                      "lineHeight": "1.2"
                    }
                  }
                ]
              },
              "width": "100%",
              "padding": "20px"
            }
          ],
          "backgroundColor": "#ffffff"
        },
        {
          "cells": [
            {
              "content": {
                "blocks": [
                  {
                    "type": "text",
                    "data": {
                      "text": "We're excited to have you on board. This is a sample email template that you can customize using the Unlayer editor.",
                      "textAlign": "left",
                      "fontSize": "16px",
                      "color": "#666666",
                      "lineHeight": "1.5"
                    }
                  }
                ]
              },
              "width": "100%",
              "padding": "20px"
            }
          ],
          "backgroundColor": "#f8f9fa"
        },
        {
          "cells": [
            {
              "content": {
                "blocks": [
                  {
                    "type": "button",
                    "data": {
                      "text": "Get Started",
                      "backgroundColor": "#007bff",
                      "color": "#ffffff",
                      "fontSize": "18px",
                      "fontWeight": "bold",
                      "borderRadius": "5px",
                      "padding": "15px 30px",
                      "textAlign": "center"
                    }
                  }
                ]
              },
              "width": "100%",
              "padding": "20px",
              "textAlign": "center"
            }
          ],
          "backgroundColor": "#ffffff"
        }
      ]
    },
    "design": {
      "width": "600px",
      "backgroundColor": "#ffffff"
    }
  };

  // State
  let currentDesign: Design | null = null;
  let exportedHtml = '';
  let exportedDesign: Design | null = null;
  let isPreviewMode = false;
  let editorRef: UnlayerEditor;

  // Handle editor loaded event
  function handleEditorLoaded(event: CustomEvent<{ editor: any }>) {
    console.log('Editor loaded:', event.detail.editor);
  }

  // Handle editor errors
  function handleEditorError(event: CustomEvent<{ message: string }>) {
    console.error('Editor error:', event.detail.message);
    alert(`Editor failed to load: ${event.detail.message}\n\nPlease check your internet connection and try refreshing the page.`);
  }

  // Handle design updates
  function handleDesignUpdated(event: CustomEvent<{ design: Design }>) {
    currentDesign = event.detail.design;
    console.log('Design updated:', currentDesign);
  }

  // Handle HTML export
  function handleExportHtml(event: CustomEvent<{ html: string; design: Design }>) {
    const { html, design } = event.detail;
    exportedHtml = html;
    exportedDesign = design;
    console.log('HTML exported:', { html, design });
  }

  // Load sample design
  function loadSampleDesign() {
    console.log('App: loadSampleDesign called');
    console.log('App: editorRef:', editorRef);
    if (editorRef) {
      console.log('App: Calling editorRef.loadDesign with:', welcomeDesign);
      editorRef.loadDesign(welcomeDesign);
      currentDesign = welcomeDesign;
      console.log('App: Design loaded, currentDesign updated');
    } else {
      console.error('App: editorRef is not available');
    }
  }

  // Export HTML
  async function exportHtml() {
    console.log('App: exportHtml called');
    if (editorRef) {
      try {
        console.log('App: Calling editorRef.exportHtml()');
        const result = await editorRef.exportHtml();
        console.log('App: Export result received:', result);
        exportedHtml = result.html;
        exportedDesign = result.design;
        console.log('App: State updated - exportedHtml:', exportedHtml, 'exportedDesign:', exportedDesign);
      } catch (error) {
        console.error('Failed to export HTML:', error);
        alert('Failed to export HTML. Please try again.');
      }
    } else {
      console.error('App: editorRef is not available');
    }
  }

  // Save design
  async function saveDesign() {
    console.log('App: saveDesign called');
    if (editorRef) {
      try {
        console.log('App: Calling editorRef.saveDesign()');
        const design = await editorRef.saveDesign();
        currentDesign = design;
        console.log('Design saved:', design);
        alert('Design saved successfully!');
      } catch (error) {
        console.error('Failed to save design:', error);
        alert('Failed to save design. Please try again.');
      }
    } else {
      console.error('App: editorRef is not available');
    }
  }

  // Toggle preview mode
  function togglePreview() {
    console.log('App: togglePreview called, current isPreviewMode:', isPreviewMode);
    isPreviewMode = !isPreviewMode;
    console.log('App: isPreviewMode changed to:', isPreviewMode);
  }

  // Clear exported content
  function clearExported() {
    console.log('App: clearExported called');
    console.log('App: Before clear - exportedHtml:', exportedHtml, 'exportedDesign:', exportedDesign);
    exportedHtml = '';
    exportedDesign = null;
    console.log('App: After clear - exportedHtml:', exportedHtml, 'exportedDesign:', exportedDesign);
  }
</script>

<main>
  <header>
    <h1>Unlayer Email Editor - Svelte SDK Demo</h1>
    <p>A lightweight Svelte wrapper around Unlayer's embeddable email editor</p>
  </header>

  <div class="controls">
    <button on:click={loadSampleDesign} class="btn btn-primary">
      Load Sample Design
    </button>
    <button on:click={exportHtml} class="btn btn-success">
      Export HTML
    </button>
    <button on:click={saveDesign} class="btn btn-info">
      Save Design
    </button>
    <button on:click={togglePreview} class="btn btn-secondary">
      {isPreviewMode ? 'Hide Preview' : 'Show Preview'}
    </button>
    <button on:click={clearExported} class="btn btn-warning">
      Clear Exported
    </button>
  </div>

  <div class="editor-container">
    <UnlayerEditor
      bind:this={editorRef}
      autoLoad={false}
      on:loaded={handleEditorLoaded}
      on:error={handleEditorError}
      on:design-updated={handleDesignUpdated}
      on:export-html={handleExportHtml}
      class="email-editor"
    />
  </div>

  {#if isPreviewMode && exportedHtml}
    <div class="preview-section">
      <h3>Preview</h3>
      <div class="preview-container">
        <iframe 
          srcdoc={exportedHtml} 
          title="Email Preview"
          class="preview-frame"
        ></iframe>
      </div>
    </div>
  {/if}

  {#if exportedHtml}
    <div class="export-section">
      <h3>Exported HTML</h3>
      <div class="code-container">
        <pre><code>{exportedHtml}</code></pre>
      </div>
      
      <h3>Exported Design JSON</h3>
      <div class="code-container">
        <pre><code>{JSON.stringify(exportedDesign, null, 2)}</code></pre>
      </div>
    </div>
  {/if}

  <footer>
    <p>
      Built with ❤️ using Svelte 5 and Unlayer Email Editor
    </p>
  </footer>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
  }

  header h1 {
    margin: 0 0 10px 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  header p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-success {
    background: #28a745;
    color: white;
  }

  .btn-info {
    background: #17a2b8;
    color: white;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-warning {
    background: #ffc107;
    color: #212529;
  }

  .editor-container {
    margin-bottom: 30px;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .email-editor {
    min-height: 600px;
  }

  .preview-section,
  .export-section {
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    border: 1px solid #e9ecef;
  }

  .preview-section h3,
  .export-section h3 {
    margin-top: 0;
    color: #495057;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 10px;
  }

  .preview-container {
    text-align: center;
  }

  .preview-frame {
    width: 100%;
    max-width: 600px;
    height: 400px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background: white;
  }

  .code-container {
    background: #2d3748;
    border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
    margin-bottom: 20px;
  }

  .code-container pre {
    margin: 0;
    color: #e2e8f0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    line-height: 1.4;
  }

  .code-container code {
    background: none;
    padding: 0;
    color: inherit;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #6c757d;
    border-top: 1px solid #e9ecef;
  }

  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 100%;
      max-width: 300px;
    }

    header h1 {
      font-size: 2rem;
    }
  }
</style>
