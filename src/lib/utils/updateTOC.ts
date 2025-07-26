'use server';
import { JSDOM } from 'jsdom';

export async function updateTOC(htmlString: string): Promise<string> {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const sections = document.querySelectorAll('section');
  const tocSection = document.querySelector('#toc');
  let toc = '';

  sections.forEach((section) => {
    const headings = Array.from(
      section.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    );
    headings.sort((a, b) => {
      const levelA = parseInt(a.tagName[1], 10);
      const levelB = parseInt(b.tagName[1], 10);
      return levelA - levelB;
    });

    const topLevelHeading = headings[0];
    const headingText = topLevelHeading.textContent
      ?.trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    if (headingText) {
      topLevelHeading.id = headingText;
      toc += `<li><a href="#${headingText}">${topLevelHeading.textContent}</a>`;
      toc += `<ol>`;
    }

    headings.slice(1).forEach((heading) => {
      const headingText = heading.textContent
        ?.trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
      if (headingText) {
        heading.id = headingText;
        toc += `<li><a href="#${headingText}">${heading.textContent}</a></li>`;
      }
    });

    toc += '</ol></li>';
  });

  const tocList = tocSection?.querySelector('ol');
  if (tocList) {
    tocList.innerHTML = toc;
  }

  return dom.serialize();
}
