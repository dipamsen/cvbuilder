import { useState } from "react";
import EditCV from "./components/EditCV";
import PreviewCV from "./components/PreviewCV";
import { CVData, defaultData } from "./models/template";
import { generateTypstCV } from "./utils/cv";

function App() {
  const [template, setTemplate] = useState("iitk");
  const [state, setState] = useState<CVData>(defaultData);

  return (
    <div className="bg-gray-900 md:h-screen text-white flex flex-col">
      <div className="bg-gray-800 text-white text-2xl font-bold text-center py-4 shadow-md shrink-0">
        CVBuilder
      </div>

      <main className="p-4 flex gap-4 text-gray-200 flex-1 md:overflow-hidden flex-col md:flex-row">
        <EditCV
          template={template}
          setTemplate={setTemplate}
          state={state}
          setState={setState}
        />
        <PreviewCV typstCode={generateTypstCV(state, template)} />
      </main>

      <div className="bg-gray-800 text-white text-sm text-center py-2 shrink-0">
        created by{" "}
        <a href="https://github.com/dipamsen" className="text-blue-400">
          dipamsen
        </a>
      </div>
    </div>
  );
}

export default App;
