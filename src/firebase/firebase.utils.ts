import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCjqKZCtWBdUtPLI50lXK47sVS2fU-Utto',
  authDomain: 'crwn-clothing-db-44ec6.firebaseapp.com',
  projectId: 'crwn-clothing-db-44ec6',
  storageBucket: 'crwn-clothing-db-44ec6.appspot.com',
  messagingSenderId: '144617975201',
  appId: '1:144617975201:web:27b7d214cc8e6744252fe0',
  measurementId: 'G-5QN2V2C6NH',
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (
  userAuth: firebase.User,
  additionalData: firebase.firestore.DocumentData | undefined
): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null> => {
  if (!userAuth) return null;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  //  User don't exist on the database, so it gets created
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(provider);

export default firebase;
