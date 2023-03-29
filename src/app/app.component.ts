import {Component, inject} from '@angular/core';
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Auth';

  auth: Auth = inject(Auth)

  signUp(){
    createUserWithEmailAndPassword(this.auth, "test@gmail.com", "test@gmail.com").then(console.log).catch(console.error)
  }
}
