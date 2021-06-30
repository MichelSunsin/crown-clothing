import { ReactElement, useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CurrentUser } from 'models/user';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import './App.css';

function App(): ReactElement {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  let unsubscribeFromAuth: { (): void; (): void } | null = null;

  useEffect(() => {
    //  Checks for authentication changes on the firebase server
    //  "userAuth" returns null if the user logged off
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, undefined);

        if (userRef) {
          userRef.onSnapshot(snapshot => {
            setCurrentUser({ ...(snapshot.data() as CurrentUser) });
          });
        }
      }

      setCurrentUser(null);
      return function unsubscribe() {
        if (unsubscribeFromAuth) {
          unsubscribeFromAuth();
        }
      };
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header currentUser={currentUser} />
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
