import {
  createTypstCompiler,
  FetchPackageRegistry,
  MemoryAccessModel,
  preloadRemoteFonts,
} from "@myriaddreamin/typst.ts";
import compileUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url";
import {
  withAccessModel,
  withPackageRegistry,
} from "@myriaddreamin/typst.ts/dist/esm/options.init.mjs";

const fontFiles = [
  "fonts/Font%20Awesome%206%20Brands-Regular-400.otf",
  "fonts/Font%20Awesome%206%20Free-Solid-900.otf",
  "fonts/Font%20Awesome%206%20Free-Regular-400.otf",
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
