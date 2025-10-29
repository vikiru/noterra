export const geminiPrompt = `
Generate a comprehensive, clearly articulated, educational set of notes on a complex topic.
The notes should provide in-depth explanations that are structured to facilitate long-term understanding. The content should be broken down into digestible, memorable components, with explanations layered to accommodate learners of all levels. Start with foundational concepts, and progressively introduce more complex details, technical nuances, and real-world applications within the same explanations.

The content should be structured logically, with optional code blocks, Mermaid diagrams, and explanations. Every visual or code example, including Mermaid diagrams, must be accompanied by detailed annotations or explanations to clarify the concept it represents. **Absolutely no external images are allowed.** All diagrams must be rendered using Mermaid syntax. **Do not include any images from external sources, including but not limited to Wikipedia, Google Images, or any other online repository.**

Structure:

Table of Contents
Provide a list of clickable links to the different sections of the notes. The content should be organized in a way that supports easy navigation for all learners.

- The TOC should include all **h1**, **h2**, **h3**, and **h4** headings, with proper hierarchical nesting.
- Each section should be linked with its corresponding heading.
- Subsections (i.e., subheadings like **h2**, **h3**, and **h4**) should be nested under their parent section, ensuring clarity in the structure.
- Each heading (h1, h2, h3, h4) must have an id attribute that matches the heading text, with spaces replaced by hyphens ('-'). For example:
  - <h2 id="section-name">Section Name</h2>
- These 'id' values should **exactly match** the anchor links in the Table of Contents. For instance, if the TOC includes a link like <a href="#section-name">Section Name</a>', then the section heading should have the corresponding id="section-name".
- Please ensure that each section and subsection has a corresponding anchor link ('#section-id') that allows easy navigation through the document.

Example structure for the TOC:

\`\`\`
<section id="toc">
  <h2>Table of Contents</h2>
  <ol>
    <li><a href="#section-1">Section 1 Title</a>
      <ol>
        <li><a href="#section-1-subsection-1">Subsection 1</a></li>
        <li><a href="#section-1-subsection-2">Subsection 2</a>
          <ol>
            <li><a href="#section-1-subsection-2-subsection-1">Sub-subsection 1</a></li>
          </ol>
        </li>
      </ol>
    </li>
    <li><a href="#section-2">Section 2 Title</a></li>
  </ol>
</section>
\`\`\`

Each heading ('h1', 'h2', 'h3', 'h4') should be linked in the Table of Contents, with proper indentation for subsections. For instance, if a 'h2' is a subsection of a 'h1', it should be indented under the 'h1'. Similarly, a 'h3' under 'h2' should be indented further.

Prerequisite Knowledge
List the prerequisite knowledge necessary for understanding the topic. Provide clear, foundational explanations, with links or references to basic concepts where helpful. Also, include technical depth and context within the same explanations, ensuring that all learners gain a comprehensive understanding. You may also include diagrams (using Mermaid syntax) or references for clarity.

Related Topics/Subtopics
Offer a comprehensive list of related topics and subtopics that provide context for the main topic. Explain each related topic in a way that begins with fundamental concepts and then naturally progresses to more advanced details, alternative viewpoints, and complex examples. Use subsections within the "Related Topics/Subtopics" section, structured as <div> elements with IDs (e.g., <div id="topic-1">), each containing an <h3> for the topic name and a <p> for the topic explanation.

Example HTML for this section:

html
<section id="related-topics">
  <h2 id="related-topics">Related Topics/Subtopics</h2>
  <div id="machine-learning-algorithms">
    <h3>Machine Learning Algorithms</h3>
    <p>Introduce simple algorithms like linear regression as a foundation, then expand to decision trees, SVMs, deep learning models, and reinforcement learning, explaining each in context.</p>
  </div>
  <div id="data-structures">
    <h3>Data Structures</h3>
    <p>Start with the basics of arrays and linked lists, then progress to hash tables, trees, B-trees, and self-balancing trees, providing explanations that build upon each other.</p>
  </div>
</section>

Introduction
Provide a detailed introduction to the topic. Use clear, accessible language, and seamlessly incorporate more technical depth and advanced applications within the same explanation. Include Mermaid diagrams where relevant to illustrate key concepts or processes.

Mindmap
Provide a mindmap overview of all the key concepts pertaining to this topic using Mermaid.js in the following syntax:
html
<pre className="mermaid">
mindmap
root((API Use))
    Origins
      Early APIs
      RESTful API Development
    Use Cases
      Web Development
        Frontend communication with Backend
      Mobile Apps
        Integration with services
      Integration with Third-Party Services
        Payment gateways
        Social Media APIs
    Research
      API Efficiency
      Security Considerations
        OAuth, API keys
      Rate Limiting and Throttling
    Tools
      Postman
      Swagger
      cURL
</pre>

Introduce this diagram naturally and seamlessly, ensuring that all learners gain a comprehensive understanding of the topic.
Please avoid newline characters within the pre tag. Add appropriate spacing instead.
Ensure that the diagram is returned exactly in this format with proper indentation and line breaks, without any HTML or other code formatting, no new line characters.
Please provide an explanation matching the criteria we've set out for the overall note structure and ensure that is both detailed and readable (i.e. end sentences when needed, paragraph breaks, making use of other html elements as needed).

Section 1 (Title)
Provide a detailed explanation of the first key component or subtopic. Begin with simple examples and analogies, and organically introduce more complexity, technical terms, and advanced aspects within the explanation. Use Mermaid diagrams to visualize complex relationships or workflows, providing detailed explanations for each diagram.

Section 2 (Title)
Similar to Section 1, diving into the next important subtopic. Ensure the explanation starts with foundational concepts and naturally progresses to more challenging examples, edge cases, and intricate details. Use Mermaid diagrams to illustrate advanced concepts or processes, ensuring each diagram is thoroughly explained.

* Please provide section 1 and section an appropriate id matching the top level heading.

Summary
Recap the main ideas, seamlessly integrating basic understanding with key technical details, complex takeaways, and deeper technical aspects. Include Mermaid diagrams to summarize key concepts or relationships, with clear explanations.

Challenge Questions
Present challenge questions that start with simple recall and comprehension, then progress to application, reasoning, and problem-solving, mirroring the learner's growing understanding of the topic. Structure the challenge questions to increase in complexity, progressing from basic to advanced concepts covered in the notes.

Provide html similar to this output for the challenge questions section:

html
<section id="challenge-questions">
  <h2 id="challenge-questions">Challenge Questions</h2>
  <p>Test your understanding of Depth-First Search (DFS) with the following questions:</p>
  <ol>
    <li>What is the difference between Depth-First Search (DFS) and Breadth-First Search (BFS)?</li>
    <li>How would you modify the DFS algorithm to find the shortest path between two nodes in an unweighted graph?</li>
    <li>Can DFS be used to detect cycles in an undirected graph? Explain how.</li>
    <li>What is the time complexity of DFS with an adjacency matrix? How does it compare to the adjacency list representation?</li>
  </ol>
</section>

* Do not mention 'Question #', this is not needed as we are using an ordered list.

Glossary
Define key terms and concepts in a way that starts with simple, clear definitions and then expands to include context, nuances, and references to advanced theories or frameworks. Use a definition list (<dl>, <dt>, <dd>) for the glossary.

Example HTML for Glossary:

html
<section id="glossary">
  <h2 id="glossary">Glossary</h2>
  <dl>
    <dt>Term 1</dt>
    <dd>Definition of Term 1...</dd>
    <dt>Term 2</dt>
    <dd>Definition of Term 2...</dd>
  </dl>
</section>

* Please do not use colons for Term Names / <dt> elements.

Further Reading
For this section, provide an html output similar to this:

<section id="further-reading">
  <h2 id="further-reading">Further Reading</h2>
</section>

Do not provide anything other than that html for the further reading section.

Optional Details to Include:

Diagrams and Visuals: Diagrams, using Mermaid syntax, must be accompanied by detailed explanations or annotations. Start with simple diagrams and explanations, and gradually introduce more technical or abstract diagrams with detailed annotations within the same visual explanation.

Please use the following format for all mermaid diagrams:
<pre className="mermaid">
      graph TD
      A[Client] --> B[Load Balancer]
      B --> C[Server01]
      B --> D[Server02]
</pre>

Additionally, don't feel limited by the types of diagrams you can render. Mermaid.js has various options such as:

Sequence Diagram:

html
<pre className="mermaid">
sequenceDiagram
    participant User
    participant System

    User->>System: Request Hello World
    System-->>User: Output "Hello World"
</pre>

Class Diagram:

html
<pre className="mermaid">
classDiagram
    class Shape {
        +int area()
        +int perimeter()
    }

    class Circle {
        +float radius
        +float calculateArea()
        +float calculatePerimeter()
    }

    class Rectangle {
        +float width
        +float height
        +float calculateArea()
        +float calculatePerimeter()
    }

    class Triangle {
        +float base
        +float height
        +float sideA
        +float sideB
        +float sideC
        +float calculateArea()
        +float calculatePerimeter()
    }

    Shape <|-- Circle
    Shape <|-- Rectangle
    Shape <|-- Triangle
</pre>

There are various other diagram types:
1. Entity Relationship Diagram (erDiagram)
2. User Journey Diagram (journey)
3. Pie chart diagrams (pie)
4. Requirement Diagram (requirementDiagram)
5. Gitgraph Diagram (gitGraph)
6. Mindmap (mindmap)
7. Timeline (timeline)
8. Kanban (kanban)

I have included the names of the diagram types above along with their respective names to be used for rendering purposes within Mermaid.js in brackets, in the form "Diagram Name (Mermaid.js Syntax Name)". Please feel free to use any and all diagrams as you see fit in a sensible way, don't feel limited to use just one either. Use as many as required to aid in the quality and completeness of the note.
For example, having a section dedicated to the mindmap with an explanation following would be a perfect general usecase diagram, a timeline would be useful for historical topics, class/architecture/sequence etc would be useful for programming related concepts however, there are always ways to use diagrams for differing concepts.

Code Examples: Provide clear code examples that start with well-commented code explaining each step, and then progress to more advanced code snippets with minimal explanation within the same example.

Real-World Use Cases: Show how the concepts are applied in real-world scenarios, starting with simple examples and progressing to cutting-edge applications within the same use case explanation.

Contextual Background: Provide historical context, starting with a brief overview of the topic’s origins and significance, then progressing to detailed explanations of key milestones and ongoing debates.

Analogies:
Use analogies to explain complex concepts. Format each analogy using <div> with id="analogy", and <blockquote> within the <div>. Try to include at least 2 analogies within the "Analogies" section. Make sure that they target different areas of the topic.

Provide html output for this section like below:

html
<section id="analogies">
  <h2 id="analogies">Analogies</h2>
  <ul>
    <li>
      <strong>Data Structures are like containers in a kitchen.</strong>
      You have different containers (bowls, jars, boxes) for storing different types of ingredients (flour, sugar, spices). The choice of container depends on the type of ingredient and how you want to access it later.
    </li>
    <li>
      <strong>Algorithms are like recipes.</strong>
      A recipe provides a step-by-step procedure for preparing a dish. Different recipes (algorithms) can be used to prepare the same dish, but some recipes may be more efficient or produce better results than others.
    </li>
  </ul>
</section>


Output Format (JSON Example):

json
{
  "note_contents": [
    {
      "title": "Table of Contents",
      "heading_level": 1,
      "content": \`<section id=\\"toc\\"><h2>Table of Contents</h2><ol><li><a href=\\"#prerequisites\\">Prerequisite Knowledge</a></li><li><a href=\\"#related-topics\\">Related Topics/Subtopics</a></li><li><a href=\\"#introduction\\">Introduction to Topic</a></li><li><a href=\\"#mindmap\\">Mindmap Overview</a></li><li><a href=\\"#summary\\">Summary</a></li><li><a href=\\"#challenge-questions\\">Challenge Questions</a></li><li><a href=\\"#section-1\\">Title of Section 1</a></li><li><a href=\\"#section-2\\">Title of Section 2</a></li><li><a href=\\"#analogies\\">Analogies</a></li><li><a href=\\"#glossary\\">Glossary</a></li><li><a href=\\"#further-reading\\">Further Reading</a></li></ol></section>\`,
      "diagram_type":  // Specify the type of diagram as a string if includes_diagram is true, otherwise return "N/A"
    },
    // ... other sections ...
  ],
  "metadata": {
    "title": "Sensible Title for the Topic", // add a unique sensible title that reflects the topic and its content, focus on the core of the topic and its importance - be concise
    "summary": "Summary of the note content, focus on the core of the topic and its importance - be concise",
    "keywords": ["keyword1", "keyword2", "topic-related"],
  },
  "flashcards": [
    // ... at least 10 flashcards ...
  ]
}

Additionally:

* Remember the existence of html elements such as <b>, <em>, <code>, <i>, <strong> when you wish to format text. For example instead of *text* use <b>text</b>
* Ensure that each section has a section id corresponding to its top level heading following this casing 'section-id', lowercase and separated by dashes.
** Please ensure all diagrams and code blocks are wrapped within a <div id="section-name-diagram-type"> or <div id="section-name-code-block">. Don't use numbers, use the diagram type if it is a diagram or section-name-code-block as id for code blocks. Diagram example: <div id="summary-diagram-gantt">.
** Improve the readability of the mindmap explanation text that follows the mindmap and ensure that it goes in depth explaining each set of nodes on the mindmap.
** Please ensure you follow my suggestions regarding diagrams, especially the syntax - avoid any newline characters ('\n'). Introduce the diagram naturally as if it was a part of a lesson.
** Do not overuse diagrams, use them sparingly to enhance readability and strengthen the reader's ability to understand the topic. Summary section for example should summarize the text as we discussed, if a diagram would enhance that section and not distract from the content - please feel free to add and use this logic for other sections as well.
* Prioritize factual accuracy and avoid generating information that is not verifiable.
* Use semantic HTML elements (e.g., <article>, <aside>, <nav>, <figure>) where appropriate to enhance accessibility.
* Tailor the complexity and depth of the explanations to cater to someone who knows nothing - someone who understands the topic at an expert level.
* Maintain a formal and academic writing style as if you were a professor teaching students at a university level, delivering notes that exude a sense of quality whilst being approachable for any reader.
`;
