import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from "@angular/fire/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = inject(Auth)

  constructor() {}

  signUpNewUser(email: string, password: string) : Observable<User> {
    return new Observable(observer => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(() => {})
        .catch((error) => observer.error(error));
    })
  }

  signInExistingUser(email: string, password: string) : Observable<User> {
    return new Observable(observer => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user: User = JSON.parse(JSON.stringify(userCredential.user))
          localStorage.setItem('user', JSON.stringify((user)))
          observer.next(user)
          observer.complete()
        })
        .catch((error) => observer.error(error));
    })
  }

  signInExistingUserWithGoogle(): Observable<User>{
    return new Observable(observer => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.auth, provider)
        .then((result) => {
          // The signed-in user info.
          const user: User = JSON.parse(JSON.stringify(result.user))
          observer.next(user)
          observer.complete()
        })
        .catch((error) => observer.error(error));
    })
  }

  signOut(): Observable<null> {
    return new Observable(observer => {
      this.auth.signOut()
        .then(() => {
          // Signed out
          observer.next(null)
          observer.complete()
        })
        .catch((error) => {
          // Sign out error
          observer.error(error)
        })
    })
  }

  getCurrentlySignedInUser(): Observable<User> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(JSON.parse(JSON.stringify(user)));
      });
    });
  }

}
