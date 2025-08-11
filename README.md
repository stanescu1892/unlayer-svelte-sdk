# Unlayer Svelte SDK

A lightweight, production-ready Svelte wrapper around Unlayer's embeddable email editor. Built with Svelte 5, TypeScript, and modern development practices.

[![npm version](https://badge.fury.io/js/unlayer-svelte-sdk.svg)](https://badge.fury.io/js/unlayer-svelte-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte](https://img.shields.io/badge/Svelte-5.0+-ff3e00.svg?logo=svelte)](https://svelte.dev)

## ✨ Features

- 🚀 **Svelte 5 Native**: Built with latest Svelte 5 syntax and features
- 🎨 **Full Editor Integration**: Complete access to Unlayer's drag-and-drop email editor
- 📱 **Responsive Design**: Automatically adapts to parent container dimensions
- 🔧 **TypeScript First**: Full type safety with comprehensive interfaces
- 📤 **Export Capabilities**: Export HTML and design JSON with ease
- 🎯 **Event-Driven**: Comprehensive event system for editor interactions
- 🧹 **Memory Safe**: Proper cleanup and lifecycle management
- 📦 **NPM Ready**: Production-ready package with proper exports

## 🚀 Quick Start

### Installation

```bash
npm install unlayer-svelte-sdk
```

### Basic Usage

```svelte
<script lang="ts">
  import UnlayerEditor from 'unlayer-svelte-sdk';
</script>

<UnlayerEditor />
```

### With Design and Events

```svelte
<script lang="ts">
  import UnlayerEditor from 'unlayer-svelte-sdk';
  import type { Design } from 'unlayer-svelte-sdk';
  
  let initialDesign: Design = {
    body: {
      rows: [
        {
          cells: [
            {
              content: {
                blocks: [
                  {
                    type: "text",
                    data: {
                      text: "Hello World!",
                      textAlign: "center",
                      fontSize: "24px"
                    }
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  };

  function handleExport(event: CustomEvent<{ html: string; design: Design }>) {
    const { html, design } = event.detail;
    console.log('HTML:', html);
    console.log('Design:', design);
  }
</script>

<UnlayerEditor
  design={initialDesign}
  on:export-html={handleExport}
/>
```

### With Methods

```svelte
<script lang="ts">
  import UnlayerEditor from 'unlayer-svelte-sdk';
  
  let editorRef: UnlayerEditor;
  
  async function exportHtml() {
    const result = await editorRef.exportHtml();
    console.log(result.html);
  }
  
  function loadDesign(design: Design) {
    editorRef.loadDesign(design);
  }
</script>

<UnlayerEditor bind:this={editorRef} />
```

## 📚 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `design` | `Design` | `undefined` | Initial design JSON to load into the editor |
| `tools` | `ToolConfig` | `undefined` | Tool whitelist/blacklist configuration |
| `options` | `UnlayerOptions` | `{}` | Unlayer initialization options |
| `autoLoad` | `boolean` | `true` | Automatically load design on mount and prop changes |
| `class` | `string` | `''` | CSS class for styling |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `loaded` | `{ editor: UnlayerEditor }` | Fired when the editor is ready |
| `design-updated` | `{ design: Design }` | Fired when design changes |
| `export-html` | `{ html: string; design: Design }` | Fired when HTML is exported |
| `error` | `{ message: string }` | Fired when editor encounters an error |

### Methods

The component exposes the following methods via binding:

```typescript
interface UnlayerEditorMethods {
  exportHtml(): Promise<{ html: string; design: Design }>;
  loadDesign(newDesign: Design): void;
  saveDesign(): Promise<Design>;
  retryLoad(): void;
}
```

## ⚙️ Configuration

### Basic Options

```svelte
<UnlayerEditor
  options={{
    displayMode: 'email',
    locale: 'en-US',
    features: {
      preview: true,
      imageEditor: true,
      stockImages: true
    }
  }}
/>
```

### Tool Configuration

```svelte
<UnlayerEditor
  tools={{
    image: { enabled: true, position: 1 },
    text: { enabled: true, position: 2 },
    button: { enabled: true, position: 3 }
  }}
/>
```

### Advanced Configuration

```svelte
<UnlayerEditor
  options={{
    customCSS: ['.custom-class { color: red; }'],
    customJS: ['console.log("Editor loaded!");'],
    features: {
      textEditor: {
        spellChecker: true,
        thesaurus: true
      }
    }
  }}
/>
```

## 🏗️ Architecture

### Component Structure

```
UnlayerEditor.svelte
├── Props Interface (design, tools, options, autoLoad, class)
├── Event Dispatcher (loaded, design-updated, export-html, error)
├── Internal State Management
├── Unlayer Script Loading (CDN with fallbacks)
├── Editor Initialization
├── Method Exports (exportHtml, loadDesign, saveDesign, retryLoad)
└── Lifecycle Management (onMount, onDestroy)
```

### Key Features

1. **Dynamic Script Loading**: Automatically loads Unlayer from CDN with fallbacks
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Event System**: Comprehensive event handling for all editor interactions
4. **Method Exposure**: Parent components can call editor methods
5. **Memory Management**: Proper cleanup to prevent memory leaks
6. **Error Handling**: Graceful fallbacks for network issues

## 🧪 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
git clone <repository-url>
cd unlayer-svelte-sdk
npm install
```

### Scripts

- `npm run dev` - Start demo development server
- `npm run build` - Build library for distribution
- `npm run build:demo` - Build demo application
- `npm run check` - Type checking and validation
- `npm run package` - Create NPM package

### Project Structure

```
unlayer-svelte-sdk/
├── src/
│   ├── lib/
│   │   └── UnlayerEditor.svelte    # Main component
│   ├── types/
│   │   └── unlayer.d.ts            # Type definitions
│   ├── assets/
│   │   └── welcome.json            # Sample design
│   ├── App.svelte                  # Demo application
│   ├── index.ts                    # Package exports
│   └── main.ts                     # Demo entry point
├── dist/                           # Library build output
├── dist-demo/                      # Demo build output
├── package.json                    # Package configuration
├── vite.config.ts                  # Library build config
├── vite.demo.config.ts             # Demo build config
├── tsconfig.build.json             # Library TypeScript config
└── README.md                       # Documentation
```

## 🌟 Best Practices

### 1. Error Handling

```svelte
<script lang="ts">
  function handleError(event: CustomEvent<{ message: string }>) {
    console.error('Editor error:', event.detail.message);
    // Show user-friendly error message
  }
</script>

<UnlayerEditor on:error={handleError} />
```

### 2. Loading States

```svelte
<script lang="ts">
  let isEditorReady = false;
  
  function handleLoaded(event: CustomEvent<{ editor: any }>) {
    isEditorReady = true;
  }
</script>

{#if isEditorReady}
  <UnlayerEditor on:loaded={handleLoaded} />
{:else}
  <div>Loading editor...</div>
{/if}
```

### 3. Design Management

```svelte
<script lang="ts">
  let currentDesign: Design;
  
  function handleDesignUpdate(event: CustomEvent<{ design: Design }>) {
    currentDesign = event.detail.design;
    // Save to localStorage or send to server
  }
</script>

<UnlayerEditor
  design={currentDesign}
  on:design-updated={handleDesignUpdate}
/>
```

## 🚀 Deployment

### Demo Application

The repository includes a complete demo application showcasing all features:

1. **Editor Integration**: Full Unlayer editor with sample design
2. **Design Management**: Load, save, and export designs
3. **HTML Export**: Export and preview generated HTML
4. **Responsive Layout**: Mobile-friendly interface
5. **Error Handling**: Graceful error handling and user feedback

### Build for Production 

```bash
# Build the library
npm run build

# Build the demo
npm run build:demo

# Create NPM package
npm run package
```

## 📊 Performance

### Bundle Sizes

- **Library**: ~33KB (gzipped: ~10KB)
- **Demo**: ~28KB (gzipped: ~11KB)
- **Total package**: ~21KB

### Build Times

- **Library build**: ~320ms
- **Demo build**: ~259ms
- **Package creation**: ~1s

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔒 Security

- CSP compliant CDN loading
- No external dependencies bundled
- Secure event handling
- Memory leak prevention

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Svelte 5 syntax and patterns
- Write clear, documented code
- Include tests for new features
- Update documentation as needed

## 🆘 Support

### Getting Help

- [GitHub Issues](https://github.com/yourusername/unlayer-svelte-sdk/issues)
- [Documentation](https://github.com/yourusername/unlayer-svelte-sdk#readme)
- [Unlayer Documentation](https://docs.unlayer.com)

### Common Issues

- **CDN Loading Failed**: Check network connectivity and try refreshing
- **TypeScript Errors**: Ensure you're using Svelte 5+ and TypeScript 5+
- **Build Issues**: Clear node_modules and reinstall dependencies

## 🎯 Roadmap

### v0.2.0
- [ ] Unit tests with Vitest
- [ ] Performance optimizations
- [ ] Additional tool configurations
- [ ] Accessibility improvements

### v0.3.0
- [ ] React compatibility layer
- [ ] Vue compatibility layer
- [ ] Advanced theming system
- [ ] Plugin architecture

## 🙏 Acknowledgments

- [Unlayer](https://unlayer.com) for the amazing email editor
- [Svelte](https://svelte.dev) team for the incredible framework
- [Vite](https://vitejs.dev) for the fast build tooling

---

**Built with ❤️ using Svelte 5 and Unlayer Email Editor**

*This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.*
