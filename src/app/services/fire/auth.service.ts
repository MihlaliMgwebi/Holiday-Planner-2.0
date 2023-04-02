import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo, idToken,
  signInWithEmailAndPassword,
  signInWithPopup
} from "@angular/fire/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import {Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = inject(Auth)
  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription | undefined;

  constructor() { }
  setTokenInLocalStorage(){
    this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
      //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
      (token) ? window.localStorage.setItem('token', 'true') : window.localStorage.setItem('token', 'false')
    })
  }

  removeTokenInLocalStorage(){
    window.localStorage.removeItem('token')
  }

  signUpNewUser(email: string, password: string){
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  signInExistingUser(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.setTokenInLocalStorage();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  signInExistingUserWithGoogle(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        this.setTokenInLocalStorage()
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const userInfo = getAdditionalUserInfo(result)
      }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    })
  }

  signOut(){
    this.removeTokenInLocalStorage();
    this.auth.signOut()
      .then(()=>{
        // Signed out
      })
      .catch((error)=>{
        // Sign out error
      })
  }
}
