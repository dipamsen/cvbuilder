import { TypstCompiler } from "@myriaddreamin/typst.ts";
import { useCallback, useEffect, useState } from "react";
import OutputViewer from "./OutputViewer";
import { useCVContext } from "../contexts/CVContext";

function PreviewCV({ typstCode }: { typstCode: string }) {
  const { compiler } = useCVContext();
  const [result, setResult] =
    useState<Awaited<ReturnType<TypstCompiler["compile"]>>>();

  const compile = useCallback(
    async (c = compiler) => {
      if (!c) return;
      c.addSource("/main.typ", typstCode);
      const result = await c.compile({
        mainFilePath: "/main.typ",
      });
      setResult(result);
    },
    [compiler, typstCode]
  );
  useEffect(() => {
    const id = setTimeout(compile, 300);
    return () => {
      clearTimeout(id);
    };
  }, [compile, typstCode]);

  return (
    <div className="section md:h-full preview p-4 bg-gray-800 shadow-md rounded-md md:w-1/2 text-gray-200">
      <div className="overflow-y-auto bg-white overflow-x-visible h-120 md:h-full space-y-6 px-0.5 [scrollbar-gutter:stable] relative">
        <OutputViewer artifact={result?.result} />
      </div>
    </div>
  );
}

export default PreviewCV;
