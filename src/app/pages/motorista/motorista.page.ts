import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage implements OnInit {
  
  motoristaForm: FormGroup;
  loading: any;

  constructor(
    private builder: FormBuilder,
    private nav: NavController,
    private userService: UserService,
    private loadingController: LoadingController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth

  ) { }

  ngOnInit() {

    this.getUsers();


    this.motoristaForm = this.builder.group({
      prontuario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  async atualizarDadosMotorista(){

  }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }



}
