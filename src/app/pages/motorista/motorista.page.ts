import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage implements OnInit {
  
  motoristaForm: FormGroup;
  loading: any;
  userData: Object = {
    prontuario:'',
    name:'',
    email:'',
    phone:'',
    birthday:'',
    location:'',
    available:''
  };

  constructor(
    private builder: FormBuilder,
    private nav: NavController,
    private userService: UserService,
    private loadingController: LoadingController,
    public firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {

    this.auth.onAuthStateChanged(user => {
      this.getUserData(user.email).subscribe((data)=>{
        this.userData = data[0];
        console.log(this.userData);
      });
    });

    this.motoristaForm = this.builder.group({
      prontuario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required]
    });
  }


  async atualizarDadosMotorista(){
    let userEmail = (<HTMLInputElement>document.getElementById('domain')).value;
    return this.firestore.doc('users' + '/' + userEmail).update(this.userData);
  }

  getUserData ( email: string ): Observable<any> {
    return this.firestore.collection<any> ( "users" , ref => ref.where ( 'email' , '==' , email ) ).valueChanges ();
  }



}
