import mermaid from 'mermaid';
import { useEffect } from 'react';

export function useMermaidRender() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
      });

      const renderMermaidDiagrams = async () => {
        const mermaidDivs = document.querySelectorAll(
          'div[id*="diagram"], div#mindmap-overview-mindmap, div[id*="mindmap"], pre.mermaid',
        );
        const mermaidDiagrams = [];

        mermaidDivs.forEach((div) => {
          if (div.getAttribute('data-processed')) return;

          const pre = div.firstElementChild;
          if (pre && pre.tagName === 'PRE') {
            mermaidDiagrams.push(pre);
          } else if (
            div.tagName === 'PRE' &&
            div.classList.contains('mermaid')
          ) {
            mermaidDiagrams.push(div);
          }
        });

        if (mermaidDiagrams.length > 0) {
          try {
            await mermaid.run({
              nodes: mermaidDiagrams,
              suppressErrors: true,
            });
          } catch (error) {
            console.error('Mermaid rendering failed:', error);
          }
        }
      };

      renderMermaidDiagrams();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);
}
