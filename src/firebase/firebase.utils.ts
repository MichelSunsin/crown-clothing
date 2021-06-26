import firebase from 'firebase/app';
import 'firebase/firestore'; // eslint-disable-line
import 'firebase/auth'; // eslint-disable-line

const config = {
  apiKey: 'AIzaSyCjqKZCtWBdUtPLI50lXK47sVS2fU-Utto',
  authDomain: 'crwn-clothing-db-44ec6.firebaseapp.com',
  projectId: 'crwn-clothing-db-44ec6',
  storageBucket: 'crwn-clothing-db-44ec6.appspot.com',
  messagingSenderId: '144617975201',
  appId: '1:144617975201:web:537a5d3f13a6aa02252fe0',
  measurementId: 'G-TQF3WDEWSN',
};

firebase.initializeApp(config);

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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(provider);

export default firebase;
