import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import Firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: Observable<Firebase.User>;

  loading: any;

  constructor(
    private auth: AngularFireAuth,
    private loadingController: LoadingController,
    private nav: NavController,
    private firestore: AngularFirestore
  ) {
    this.isLoggedIn = this.auth.authState;
  }

  login(user) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  getById(id){
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }

  createUser(user) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  createUserInFirestore(user){
    return this.firestore.collection('users').doc(user.email).set(user);
  }

  updateUserInFirestore(user){
    return this.firestore.collection('users').doc(user.email).update(user);
  }
  
  forgotPassword(id) {
    return this.auth.sendPasswordResetEmail(id);
  }

  logout(){
    return this.auth.signOut();
  }

  async isUserLoggedIn(){

    this.loading = await this.loadingController.create({ spinner: 'crescent' });
    
    await this.loading.present();

    try {
      await this.isLoggedIn.subscribe(user => {
        if(user){
          this.nav.navigateForward('home');
        }
      });      
    } catch (err) {
      console.error(err);
    }

    await this.loading.dismiss();
  }

}
