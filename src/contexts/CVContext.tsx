import { createContext, useContext, useEffect, useState } from "react";
import { CVData, defaultData } from "../models/template";
import { TypstCompiler, TypstRenderer } from "@myriaddreamin/typst.ts";
import { setupCompiler, setupRenderer } from "../utils/typst";
import { loadSavedData, saveData } from "../utils/persist";

interface CVContextType {
  state: CVData;
  setState: React.Dispatch<React.SetStateAction<CVData>>;
  template: string;
  setTemplate: React.Dispatch<React.SetStateAction<string>>;
  compiler?: TypstCompiler;
  renderer?: TypstRenderer;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CVData>(defaultData);
  const [template, setTemplate] = useState("iitk");
  const [compiler, setCompiler] = useState<TypstCompiler>();
  const [renderer, setRenderer] = useState<TypstRenderer>();

  useEffect(() => {
    if (compiler) return;
    async function init() {
      const cc = await setupCompiler();
      cc.addSource("/main.typ", "");
      setCompiler(cc);
    }
    init();
  }, [compiler]);

  useEffect(() => {
    async function init() {
      const r = await setupRenderer();
      setRenderer(r);
    }

    if (!renderer) {
      init();
    }
  }, [renderer]);

  useEffect(() => {
    setState(loadSavedData());
  }, []);

  useEffect(() => {
    if (state) {
      saveData(state);
    }
  }, [state]);

  return (
    <CVContext.Provider
      value={{ state, setState, template, setTemplate, compiler, renderer }}
    >
      {children}
    </CVContext.Provider>
  );
}

export const useCVContext = (): CVContextType => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCVContext must be used within a CVProvider");
  }
  return context;
};
