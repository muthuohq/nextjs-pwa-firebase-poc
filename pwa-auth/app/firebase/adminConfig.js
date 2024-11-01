//REF: https://www.youtube.com/watch?v=-BEqV6eaaQk

import { initializeApp, cert,getApps,getApp } from 'firebase-admin/app';
import serviceAccount from './serviceAccount.json'; // Adjust this to your service account path
 import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK only once
const adminConfig = {
    credential: cert(serviceAccount )
  };
const adminApp = !getApps().length ? initializeApp(adminConfig) : getApp();
const adminAuth = getAuth(adminApp);
export {adminApp,adminAuth} ;