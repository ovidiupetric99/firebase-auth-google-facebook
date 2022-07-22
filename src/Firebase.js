import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";

const {REACT_APP_FIREBASE_SECRET_KEY} = process.env; //linia asta nu e necesara daca lasati default apiKey-ul

//eu am creeat in fisierul root un file cu numele .env (initial am instalat dotenv cu npm install dotenv)
//apoi in fisierul .env am pus apiKey-ul sub forma REACT_APP_FIREBASE_SECRET_KEY="<apiKey>";

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_SECRET_KEY, 
  authDomain: "fir-auth-78ad0.firebaseapp.com",
  projectId: "fir-auth-78ad0",
  storageBucket: "fir-auth-78ad0.appspot.com",
  messagingSenderId: "427612406084",
  appId: "1:427612406084:web:8b494eb017b1e6a5695711",
};  //aici va puneti voi config-ul generat in interfata firebase. eu am pus apiKey-ul intr-un fisier .env ca sa nu fie public in browser cand dai inspect.

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInUser = async (provider) => {
  try {
    const result = await signInWithPopup(
      auth,
      provider === "google" ? googleProvider : facebookProvider
    );

    const name = result.user.displayName;
    const email = result.user.email;
    let profilePicture;

    if (provider === "facebook") {
      const user = result.user;
      const token = result._tokenResponse.oauthAccessToken;
      profilePicture = user.photoURL + "?height=100&access_token=" + token;
    } else {
      profilePicture = result.user.photoURL;
    }

    return {
      provider: result.providerId,
      name,
      email,
      profilePicture,
    };
  } catch (error) {
    console.log("Error on Sign In", error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Sign out successfully!");
  } catch (error) {
    console.log("Error on Sign Out", error);
  }
};
