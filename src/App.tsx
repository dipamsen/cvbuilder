import EditCV from "./components/EditCV";
import PreviewCV from "./components/PreviewCV";
import { generateTypstCV } from "./utils/cv";
import { useCVContext } from "./contexts/CVContext";

function App() {
  const { state, template, settings } = useCVContext();

  return (
    <div className="bg-gray-900 md:h-screen text-white flex flex-col">
      <div className="bg-gray-800 text-white text-2xl font-bold text-center py-4 shadow-md shrink-0">
        CVBuilder
      </div>

      <main className="p-4 flex gap-4 text-gray-200 flex-1 md:overflow-hidden flex-col md:flex-row">
        <EditCV />
        <PreviewCV typstCode={generateTypstCV(state, settings, template)} />
      </main>

      <div className="bg-gray-800 text-white text-sm text-center py-2 shrink-0">
        created by{" "}
        <a href="https://github.com/dipamsen" className="text-blue-400">
          dipamsen
        </a>
        <span className="mx-1">&#183;</span>
        <a
          href="https://github.com/dipamsen/cvbuilder"
          className="text-blue-400"
        >
          source
        </a>
      </div>
    </div>
  );
}

export default App;
