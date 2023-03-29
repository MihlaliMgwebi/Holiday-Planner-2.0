import {Component, inject} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {AuthService} from "./services/fire/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService){}

  signUpNewUser(email: string, password: string){
    this.authService.signUpNewUser(email, password)
  }

  signInExistingUser(email: string, password: string){
    this.authService.signInExistingUser(email,password)
  }

  signInExistingUserWithGoogle(){
    this.authService.signInExistingUserWithGoogle()
  }
}
