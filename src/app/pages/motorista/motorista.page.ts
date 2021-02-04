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
  
  userData: any = {
    prontuario:'',
    name:'',
    email:'',
    phone:'',
    birthday:'',
    location: {
      address: '',
      latitude: 0,
      longitude: 0
    },
    available:false
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
      this.userService.getById(user.email).subscribe((data)=>{
        this.userData = data.payload.data();
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

  async userIsAvailable(event){
    this.userData.available = event.detail.checked;
  }

  async atualizarDadosMotorista(){

    this.loading = await this.loadingController.create({ spinner: 'crescent' });

    await this.loading.present();

    const data = this.motoristaForm.value;    

    data.available = this.userData.available;

    data.location = {
      address: this.motoristaForm.value.address,
      latitude: this.userData.location.latitude === undefined ? 0 : this.userData.location.latitude,
      longitude: this.userData.location.longitude === undefined ? 0 : this.userData.location.longitude
    }    

    delete data.address;

    data.email = (<HTMLInputElement>document.getElementById('domain')).value;
    
    await this.userService.updateUserInFirestore(data);

    await this.loading.dismiss();
  }

}
