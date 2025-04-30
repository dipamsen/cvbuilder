import { TypstCompiler } from "@myriaddreamin/typst.ts";
import { useCallback, useEffect, useState } from "react";
import { setupCompiler } from "../utils/typstCompiler";
import { TypstDocument } from "@myriaddreamin/typst.react";

function PreviewCV({ typstCode }: { typstCode: string }) {
  const [compiler, setCompiler] = useState<TypstCompiler | null>(null);
  const [result, setResult] =
    useState<Awaited<ReturnType<TypstCompiler["compile"]> | null>>(null);

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
    if (compiler) return;
    async function init() {
      const cc = await setupCompiler();
      cc.addSource("/main.typ", typstCode);
      setCompiler(cc);
      compile(cc);
    }
    init();
  }, [compiler, compile, typstCode]);

  useEffect(() => {
    const id = setTimeout(() => {
      compile();
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [typstCode, compile]);
  return (
    <div className="section md:h-full preview p-4 bg-gray-800 shadow-md rounded-md md:w-1/2 text-gray-200">
      <div className="overflow-y-auto bg-white overflow-x-visible h-120 md:h-full space-y-6 px-0.5">
        {result?.result && <TypstDocument artifact={result.result} />}
      </div>
    </div>
  );
}

export default PreviewCV;
