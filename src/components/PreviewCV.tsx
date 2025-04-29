import renderUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url";
import compileUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url";
import { $typst } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs";
import { useEffect, useState } from "react";

$typst.setRendererInitOptions({
  getModule: () => new URL(renderUrl, import.meta.url),
});

$typst.setCompilerInitOptions({
  getModule: () => new URL(compileUrl, import.meta.url),
});

function PreviewCV({ typstCode }: { typstCode: string }) {
  const [svg, setSvg] = useState<string>("");
  useEffect(() => {
    const compile = async () => {
      const s = await $typst.svg({
        mainContent: typstCode,
      });
      setSvg(s.replace(/<svg/, '<svg width="100%" height="100%" '));
    };
    const id = setTimeout(() => {
      compile().catch((e) => {
        console.error(e);
        setSvg(
          `<div class="text-red-500 text-center">Error: ${e.message}</div>`
        );
      });
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [typstCode]);
  return (
    <div className="section h-full preview p-4 bg-gray-800 shadow-md rounded-md w-1/2 text-gray-200">
      <div className="overflow-y-auto bg-white overflow-x-visible h-full space-y-6 px-0.5">
        <div
          className="preview-svg"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>
  );
}

export default PreviewCV;
