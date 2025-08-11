# Unlayer Svelte SDK

A lightweight Svelte 5 + TypeScript wrapper for [Unlayer’s embeddable email editor](https://docs.unlayer.com).  
This package lets you easily embed the Unlayer editor in a Svelte app, handle events, and export HTML/designs.  
It’s built with Vite, includes a minimal demo, and supports an optional CDN fallback.

## Features

- **Simple integration** — Drop `<UnlayerEditor />` into any Svelte project.
- **TypeScript support** — Props and events are strongly typed.
- **CDN fallback** — Automatically loads from CDN if `unlayer` isn’t installed.
- **Demo app included** — Load a sample design, export HTML, and preview.

---

## Quick Start

### 1. Install

```bash
npm install unlayer
