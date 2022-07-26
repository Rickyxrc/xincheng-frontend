/// <reference types="vite/client" />

declare module "@kangc/v-md-editor";
declare module "@kangc/v-md-editor/lib/preview";
declare module "@kangc/v-md-editor/lib/theme/github.js";

declare module "@kangc/v-md-editor/lib/plugins/katex/cdn";

declare module "@kangc/v-md-editor/lib/codemirror-editor";

// declare module 'codemirror/mode/markdown/markdown';

declare module "codemirror/addon/edit/closebrackets";
declare module "codemirror/addon/edit/closetag";
declare module "codemirror/addon/edit/matchbrackets";
// placeholder
declare module "codemirror/addon/display/placeholder";
// active-line
declare module "codemirror/addon/selection/active-line";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
