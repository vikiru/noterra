import { faker } from '@faker-js/faker';

import { db } from '@/db/index';
import { flashcardsTable, notesTable, usersTable } from '@/db/schema';

async function createRandomFlashcard(authorId: string, noteId: string) {
  const flashcard = db
    .insert(flashcardsTable)
    .values({
      authorId,
      noteId,
      question: faker.lorem.sentence(4).replace('.', ''),
      answer: faker.lorem.sentence(4).replace('.', ''),
    })
    .returning();
  console.log('Flashcard\n', flashcard);
  return flashcard;
}

async function createRandomNote(authorId: string) {
  const note = db
    .insert(notesTable)
    .values({
      authorId,
      title: faker.lorem.sentence(4).replace('.', ''),
      summary: faker.lorem.sentence(10),
      keywords: faker.lorem.words(10).replace('.', ''),
      content: generateFakeNoteHTML(),
    })
    .returning();
  return note;
}

async function createRandomUser() {
  const user = await db
    .insert(usersTable)
    .values({
      clerkId: faker.string.uuid(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      bio: faker.person.bio(),
      country: faker.location.country(),
    })
    .returning();
  return user;
}

function generateFakeNoteHTML() {
  const title = `<h1>${faker.lorem.sentence()}</h1>`;
  const intro = `<p>${faker.lorem.paragraph()}</p>`;
  const subheading = `<h2>${faker.lorem.words(3)}</h2>`;

  const paragraphs = Array.from(
    { length: 3 },
    () => `<p>${faker.lorem.paragraph()}</p>`,
  ).join('\n');

  const bulletPoints = Array.from(
    { length: 5 },
    () => `<li>${faker.lorem.sentence()}</li>`,
  ).join('\n');
  const list = `<ul>${bulletPoints}</ul>`;
  const outro = `<p>${faker.lorem.paragraph()}</p>`;
  return `
    ${title}
    ${intro}
    ${subheading}
    ${paragraphs}
    ${list}
    ${outro}
  `;
}

export { createRandomFlashcard, createRandomNote, createRandomUser };
