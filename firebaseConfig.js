// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD_F2Di-GF6ybhx_EeW888JmmonlFa4svU',
  authDomain: 'appzinho-dc9b3.firebaseapp.com',
  projectId: 'appzinho-dc9b3',
  storageBucket: 'appzinho-dc9b3.firebasestorage.app',
  messagingSenderId: '615703282311',
  appId: '1:615703282311:android:d32096d9aff3805abd2e22',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
