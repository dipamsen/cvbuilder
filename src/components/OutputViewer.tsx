import { TypstRenderer } from "@myriaddreamin/typst.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { setupRenderer } from "../utils/typst";
import useDebounced from "../utils/useDebounced";

export default function OutputViewer({ artifact }: { artifact?: Uint8Array }) {
  const [renderer, setRenderer] = useState<TypstRenderer | null>(null);
  const [loaded, setLoaded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const loadingEl = (
    <div className="flex items-center justify-center h-full text-gray-500">
      <span className="loader"></span>
      Loading...
    </div>
  );

  useEffect(() => {
    async function init() {
      const r = await setupRenderer();
      setRenderer(r);
    }

    if (!renderer) {
      init();
    }
  }, [renderer]);

  const renderOut = useCallback(async () => {
    if (renderer && divRef.current && artifact) {
      await renderer.renderToCanvas({
        artifactContent: artifact,
        container: divRef.current,
        format: "vector",
        pixelPerPt: 3,
      });
      setLoaded(true);
    }
  }, [artifact, renderer]);

  useDebounced(
    () => {
      renderOut();
    },
    500,
    []
  );

  useEffect(() => {
    let id: number | null = null;
    window.addEventListener("resize", () => {
      if (id != null) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        renderOut();
      }, 100);
    });
  }, [renderOut]);

  if (!artifact) return loadingEl;

  return (
    <>
      <style>{s}</style>
      <div
        ref={divRef}
        style={{
          display: loaded ? "block" : "none",
        }}
      ></div>
      {!loaded && loadingEl}
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
