import mermaid from 'mermaid';
import { useEffect } from 'react';

export function useMermaidRender() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          nodePadding: 8,
          textMargin: 4,
        },
      });

      const renderMermaidDiagrams = async () => {
        const mermaidElements = document.querySelectorAll(
          'div[id*="diagram"], div#mindmap-overview-mindmap, div[id*="mindmap"], pre.mermaid, pre',
        );

        for (const element of mermaidElements) {
          if (element.getAttribute('data-processed')) continue;

          let diagramElement = null;

          // Handle case where element is pre with child element code (usually after note edit submissions)
          if (element.tagName === 'PRE') {
            const childElement = element.firstElementChild;
            if (childElement && childElement.tagName === 'CODE') {
              diagramElement = childElement;
            }
          } else {
            // Handle case with div elements that have pre.code/pre.mermaid as child (raw gemini ai note generation case)
            const childElement = element.firstElementChild;
            if (childElement && childElement.tagName === 'PRE') {
              diagramElement = childElement;
            } else if (
              element.tagName === 'PRE' &&
              element.classList.contains('mermaid')
            ) {
              diagramElement = element;
            }
          }

          if (!diagramElement) continue;

          const code = diagramElement.textContent?.trim();
          if (!code) continue;

          // Validate the diagram syntax before rendering
          try {
            await mermaid.parse(code);
            // If valid, render it
            await mermaid.run({
              nodes: [diagramElement as HTMLElement],
              suppressErrors: true,
            });
          } catch (error) {
            // Invalid Mermaid syntax - leave it as a code block
            diagramElement.setAttribute('data-processed', 'skipped');
          }
        }
      };

      renderMermaidDiagrams();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);
}
