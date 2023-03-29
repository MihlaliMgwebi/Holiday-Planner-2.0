import {Component, inject} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Auth';

  auth: Auth = inject(Auth)
  constructor(){}

  signUpNewUser(email: string, password: string){
    createUserWithEmailAndPassword(this.auth, email, password).then(console.log).catch(console.error)
  }

  signInExistingUsers(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password).then(console.log).catch(console.error)
  }

}
