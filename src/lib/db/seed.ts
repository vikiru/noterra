import {
  createRandomFlashcard,
  createRandomNote,
  createRandomUser,
} from '@/db/seedUtils';

async function seedData() {
  for (let i = 0; i < 10; i++) {
    const userData = await createRandomUser();
    const user = userData[0];

    for (let j = 0; j < 20; j++) {
      const noteData = await createRandomNote(user.clerkId);
      const note = noteData[0];
      await createRandomFlashcard(user.clerkId, note.id);
    }
  }
}

seedData();
