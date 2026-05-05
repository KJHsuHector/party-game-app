import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCedcTzrFvO-4XOWRq-7JrmiYw5pQEVViU",
  authDomain: "piggy-app-7f42d.firebaseapp.com",
  projectId: "piggy-app-7f42d",
  storageBucket: "piggy-app-7f42d.firebasestorage.app",
  messagingSenderId: "1046144368349",
  appId: "1:1046144368349:web:cf026a7139d4ec3ec82534",
  measurementId: "G-YXSKM4BLL8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// In a web client SDK, you can't list collections directly.
// But we can try 'prompts', 'game_prompts', 'party-game' to see if they exist.
async function checkCollections() {
  const collsToCheck = ['party_game', 'party-game', 'prompts', 'game_prompts'];
  for (const collName of collsToCheck) {
    console.log(`Checking collection: ${collName}`);
    try {
      const snap = await getDocs(collection(db, collName));
      if (!snap.empty) {
        console.log(` -> Found ${snap.size} documents in ${collName}`);
        snap.forEach(doc => {
           console.log(`    - Doc ID: ${doc.id}`);
           // Just print a snippet to see what's in it
           const data = doc.data();
           console.log(`      Keys: ${Object.keys(data)}`);
        });
      } else {
        console.log(` -> Empty or not found`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

checkCollections();
