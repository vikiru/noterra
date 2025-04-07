export const geminiPrompt = `
Generate a comprehensive, clearly articulated, educational set of notes on a complex topic.
The notes should provide in-depth explanations that are structured to facilitate long-term understanding. The content should be broken down into digestible, memorable components, with explanations layered to accommodate learners of all levels. Start with foundational concepts, and progressively introduce more complex details, technical nuances, and real-world applications within the same explanations.

The content should be structured logically, with optional code blocks, Mermaid diagrams, and explanations. Every visual or code example, including Mermaid diagrams, must be accompanied by detailed annotations or explanations to clarify the concept it represents. **ABSOLUTELY NO EXTERNAL IMAGES ARE ALLOWED.** All diagrams must be rendered using Mermaid syntax. **DO NOT INCLUDE ANY IMAGES FROM EXTERNAL SOURCES, INCLUDING BUT NOT LIMITED TO WIKIPEDIA, GOOGLE IMAGES, OR ANY OTHER ONLINE REPOSITORY.**

Structure:

Table of Contents
Provide a list of clickable links to the different sections of the notes. The content should be organized in a way that supports easy navigation for all learners.

Prerequisite Knowledge
List the prerequisite knowledge necessary for understanding the topic. Provide clear, foundational explanations, with links or references to basic concepts where helpful. Also, include technical depth and context within the same explanations, ensuring that all learners gain a comprehensive understanding. You may also include diagrams (using Mermaid syntax) or references for clarity.

Related Topics/Subtopics
Offer a comprehensive list of related topics and subtopics that provide context for the main topic. Explain each related topic in a way that begins with fundamental concepts and then naturally progresses to more advanced details, alternative viewpoints, and complex examples. Use subsections within the "Related Topics/Subtopics" section, structured as <div> elements with IDs (e.g., <div id="topic-1">), each containing an <h3> for the topic name and a <p> for the topic explanation.

Example HTML for this section:

html
<section id="related-topics">
  <h2>Related Topics/Subtopics</h2>
  <div id="topic-1">
    <h3>Topic 1: Machine Learning Algorithms</h3>
    <p>Introduce simple algorithms like linear regression as a foundation, then expand to decision trees, SVMs, deep learning models, and reinforcement learning, explaining each in context.</p>
  </div>
  <div id="topic-2">
    <h3>Topic 2: Data Structures</h3>
    <p>Start with the basics of arrays and linked lists, then progress to hash tables, trees, B-trees, and self-balancing trees, providing explanations that build upon each other.</p>
  </div>
</section>

Introduction to Topic
Provide a detailed introduction to the topic. Use clear, accessible language, and seamlessly incorporate more technical depth and advanced applications within the same explanation. Include Mermaid diagrams where relevant to illustrate key concepts or processes.

Section 1 (Title)
Provide a detailed explanation of the first key component or subtopic. Begin with simple examples and analogies, and organically introduce more complexity, technical terms, and advanced aspects within the explanation. Use Mermaid diagrams to visualize complex relationships or workflows, providing detailed explanations for each diagram.

Section 2 (Title)
Similar to Section 1, diving into the next important subtopic. Ensure the explanation starts with foundational concepts and naturally progresses to more challenging examples, edge cases, and intricate details. Use Mermaid diagrams to illustrate advanced concepts or processes, ensuring each diagram is thoroughly explained.

Summary
Recap the main ideas, seamlessly integrating basic understanding with key technical details, complex takeaways, and deeper technical aspects. Include Mermaid diagrams to summarize key concepts or relationships, with clear explanations.

Challenge Questions
Present challenge questions that start with simple recall and comprehension, then progress to application, reasoning, and problem-solving, mirroring the learner's growing understanding of the topic. Structure the challenge questions to increase in complexity, progressing from basic to advanced concepts covered in the notes.

Glossary
Define key terms and concepts in a way that starts with simple, clear definitions and then expands to include context, nuances, and references to advanced theories or frameworks. Use a definition list (<dl>, <dt>, <dd>) for the glossary.

Example HTML for Glossary:

html
<section id="glossary">
  <h2>Glossary</h2>
  <dl>
    <dt>Term 1</dt>
    <dd>Definition of Term 1...</dd>
    <dt>Term 2</dt>
    <dd>Definition of Term 2...</dd>
  </dl>
</section>

Further Reading
Include links to additional resources, such as articles, courses, or research papers. Organize resources to start with introductory materials and progress to more detailed and advanced content within the same resource list. If no resources of a particular type (e.g., articles, courses) exist, use a paragraph instead of an empty list. Aim for up to 5 articles and up to 5 courses, if available.

Example HTML for this section:

html
<section id="further-reading">
  <h2>Further Reading</h2>
  <div id="articles">
    <h3>Articles</h3>
    <ul>
      <li><a href="#">Introductory and Advanced Concepts in Machine Learning</a></li>
      <li><a href="#">Advanced Deep Learning Techniques</a></li>
    </ul>
  </div>
  <div id="courses">
    <ul>
      <li><a href="#">Python Programming and Deep Learning Specialization</a></li>
      <li><a href="#">Advanced Machine Learning Course</a></li>
    </ul>
  </div>
</section>

Optional Details to Include:

Diagrams and Visuals: Diagrams, using Mermaid syntax, must be accompanied by detailed explanations or annotations. Start with simple diagrams and explanations, and gradually introduce more technical or abstract diagrams with detailed annotations within the same visual explanation.

Code Examples: Provide clear code examples that start with well-commented code explaining each step, and then progress to more advanced code snippets with minimal explanation within the same example.

Real-World Use Cases: Show how the concepts are applied in real-world scenarios, starting with simple examples and progressing to cutting-edge applications within the same use case explanation.

Contextual Background: Provide historical context, starting with a brief overview of the topic’s origins and significance, then progressing to detailed explanations of key milestones and ongoing debates.

Analogies:
Use analogies to explain complex concepts. Format each analogy using <div> with id="analogy#", and <blockquote> within the <div>. Try to include at least 2 analogies within the "Analogies" section. Make sure that they target different areas of the topic.

Example HTML for Analogies:

html
<section id="analogies">
  <h2>Analogies</h2>
  <div id="analogy-1">
    <h4><strong>Data Structures are like containers in a kitchen.</strong></h4>
    <blockquote>You have different containers (bowls, jars, boxes) for storing different types of ingredients (flour, sugar, spices). The choice of container depends on the type of ingredient and how you want to access it later.</blockquote>
  </div>
  <div id="analogy-2">
    <h4><strong>Algorithms are like recipes.</strong></h4>
    <blockquote>A recipe provides a step-by-step procedure for preparing a dish. Different recipes (algorithms) can be used to prepare the same dish, but some recipes may be more efficient or produce better results than others.</blockquote>
  </div>
</section>

Output Format (JSON Example):

json
{
  "note_contents": [
    {
      "title": "Table of Contents",
      "heading_level": 1,
      "content": "<section id=\\"toc\\"><h1>Table of Contents</h1><ol><li><a href=\\"#prerequisites\\">Prerequisite Knowledge</a></li><li><a href=\\"#related-topics\\">Related Topics/Subtopics</a></li><li><a href=\\"#introduction\\">Introduction to Topic</a></li><li><a href=\\"#summary\\">Summary</a></li><li><a href=\\"#challenge-questions\\">Challenge Questions</a></li><li><a href=\\"#section-1\\">Title of Section 1</a></li><li><a href=\\"#section-2\\">Title of Section 2</a></li><li><a href=\\"#analogies\\">Analogies</a></li><li><a href=\\"#glossary\\">Glossary</a></li><li><a href=\\"#further-reading\\">Further Reading</a></li></ol></section>",
      "includes_diagram": false
    },
    // ... other sections ...
  ],
  "metadata": {
    "keywords": ["keyword1", "keyword2", "topic-related"],
    "related_topics": ["Related Topic 1", "Related Topic 2", "Subtopic"]
  },
  "flashcards": [
    // ... at least 10 flashcards ...
  ]
}

Additionally:

* Ensure that all URLs provided in the "Further Reading" section are functional and verified.
* Prioritize factual accuracy and avoid generating information that is not verifiable.
* Use semantic HTML elements (e.g., <article>, <aside>, <nav>, <figure>) where appropriate to enhance accessibility.
* Tailor the complexity and depth of the explanations to cater to someone who knows nothing - someone who understands the topic at an expert level.
* Maintain a formal and academic writing style as if you were a professor teaching students at a university level, delivering notes that exude a sense of quality whilst being approachable for any reader.
`;
