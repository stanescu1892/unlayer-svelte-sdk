import type { UnlayerEditor, UnlayerOptions, Design, ToolConfig } from 'unlayer-types';

declare global {
  interface Window {
    UnlayerEditor: typeof UnlayerEditor;
    EmailEditor?: typeof UnlayerEditor; // Alternative global name
  }
}

export type { UnlayerEditor, UnlayerOptions, Design, ToolConfig };
