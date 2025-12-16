import {
  createTypstCompiler,
  createTypstRenderer,
  FetchPackageRegistry,
  MemoryAccessModel,
  preloadRemoteFonts,
} from "@myriaddreamin/typst.ts";
import compileUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url";
import renderUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url";
import {
  withAccessModel,
  withPackageRegistry,
} from "@myriaddreamin/typst.ts/dist/esm/options.init.mjs";

export const fontFiles = [
  "fonts/Font%20Awesome%206%20Brands-Regular-400.otf",
  "fonts/Font%20Awesome%206%20Free-Solid-900.otf",
  "fonts/Font%20Awesome%206%20Free-Regular-400.otf",
  "fonts/PTSans-Bold.ttf",
  "fonts/PTSans-Italic.ttf",
  "fonts/PTSans-Regular.ttf",
  "fonts/PTSans-BoldItalic.ttf",
];

export async function setupCompiler() {
  const compiler = createTypstCompiler();
  const m = new MemoryAccessModel();
  await compiler.init({
    beforeBuild: [
      preloadRemoteFonts(fontFiles),
      withAccessModel(m),
      withPackageRegistry(new FetchPackageRegistry(m)),
    ],
    getModule: () => new URL(compileUrl, import.meta.url),
  });

  return compiler;
}

export async function setupRenderer() {
  const renderer = createTypstRenderer();
  await renderer.init({
    beforeBuild: [],
    getModule: () => new URL(renderUrl, import.meta.url),
  });

  return renderer;
}
