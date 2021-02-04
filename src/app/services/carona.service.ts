import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CaronaService {
  collection: AngularFirestoreCollection;

  constructor(
    private db: AngularFirestore
  ) { }

  listMotoristas(card){
    this.collection = this.db.collection('users', ref=> ref.where('available', '==', true));
    return this.collection.valueChanges();
  }
}
