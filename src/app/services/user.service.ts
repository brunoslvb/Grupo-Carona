import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import Firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: Observable<Firebase.User>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.isLoggedIn = this.auth.authState;
  }

  login(user) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  createUser(user) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  createUserInFirestore(user){
    return this.firestore.collection('users').doc(user.email).set(user);
  }
  
  forgotPassword(id) {
    return this.auth.sendPasswordResetEmail(id);
  }

}
