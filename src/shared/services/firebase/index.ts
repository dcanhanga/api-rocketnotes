import admin from 'firebase-admin';

import { firebaseKey } from '@/config/firebaseKey';

export const STORAGE_BUCKET = 'rocketnotes-e1393.appspot.com';
export const storageGoogleApisUrl = 'https://storage.googleapis.com';
admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
  storageBucket: STORAGE_BUCKET
});

export const firebase = admin.storage().bucket();
export { importAvatar } from './importAvatar';
export { updateAvatar } from './updateAvatar';
