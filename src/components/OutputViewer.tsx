import { useCallback, useEffect, useRef } from "react";
import { useCVContext } from "../contexts/CVContext";

export default function OutputViewer({ artifact }: { artifact?: Uint8Array }) {
  const { renderer } = useCVContext();
  const divRef = useRef<HTMLDivElement>(null);

  const loadingEl = (
    <div className="flex items-center justify-center h-full w-full text-gray-500 absolute">
      <span className="loader"></span>
      Loading...
    </div>
  );

  const renderOut = useCallback(async () => {
    if (renderer && divRef.current && artifact) {
      await renderer.renderToCanvas({
        artifactContent: artifact,
        container: divRef.current,
        format: "vector",
        pixelPerPt: 3,
      });
    }
  }, [artifact, renderer]);

  useEffect(() => {
    const id = setTimeout(renderOut, 300);
    return () => {
      clearTimeout(id);
    };
  }, [renderOut, artifact]);

  useEffect(() => {
    let id: number | null = null;
    window.addEventListener("resize", () => {
      if (id != null) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        renderOut();
      }, 250);
    });
  }, [renderOut]);

  return (
    <>
      <style>{s}</style>
      <div ref={divRef}>{loadingEl}</div>
    </>
  );
}

// https://github.com/Myriad-Dreamin/typst.ts/blob/main/packages/typst.react/src/lib/TypstDocument.tsx
const s = `.typst-html-semantics {
  position: absolute;
  z-index: 2;
  color: transparent;
  font-family: monospace;
  white-space: pre;
}

.typst-html-semantics span {
  color: transparent;
  font-family: monospace;
  transform-origin: left top;
  position: absolute;
  display: inline-block;
  left: 0;
  top: 0;
}

.typst-content-hint {
  position: absolute;
  display: inline-block;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.typst-html-semantics a {
  position: absolute;
  display: inline-block;
}

/* set transparent itself */
.typst-content-group {
  pointer-events: visible;
}

.typst-html-semantics span::-moz-selection {
  color: transparent;
  background: #7db9dea0;
}

.typst-html-semantics span::selection {
  color: transparent;
  background: #7db9dea0;
}

.typst-html-semantics *::-moz-selection {
  color: transparent;
  background: transparent;
}

.typst-html-semantics *::selection {
  color: transparent;
  background: transparent;
}

.typst-content-fallback {
  color: transparent;
  background: transparent;
}

.pseudo-link,
.typst-text {
  pointer-events: none;
}`;
