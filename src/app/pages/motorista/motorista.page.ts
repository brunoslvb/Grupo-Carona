import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

declare var google;

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage implements OnInit {
  
  private googleMapsPlaces = new google.maps.places.AutocompleteService();
  private googleMapsGeocoder = new google.maps.Geocoder();

  motoristaForm: FormGroup;
  
  loading: any;
  
  addresses: Array<{
    description: string;
  }> = [];

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

    const data = {
      email: this.userData.email,
      available: this.userData.available,
      location: {
        address: this.motoristaForm.value.address,
        latitude: this.userData.location.latitude === undefined ? 0 : this.userData.location.latitude,
        longitude: this.userData.location.longitude === undefined ? 0 : this.userData.location.longitude
      }
    }

    await this.userService.updateUserInFirestore({...this.motoristaForm.value, ...data});
    
    await this.loading.dismiss();
  }

  async searchAddress(){
    this.googleMapsPlaces.getPlacePredictions({ input: this.motoristaForm.value.address }, predictions => {
      this.addresses = predictions;
    });
  }

  clearInput() {
    if(!this.motoristaForm.value.address.trim().length) {
      this.addresses = [];
      return;
    }; 
  }

  async searchSelected(address: string) {
    
    (<HTMLInputElement>document.getElementById('address')).value = address;

    this.motoristaForm.value.address = address;

    this.addresses = [];

    await this.googleMapsGeocoder.geocode({
      address
    }, (data) => {
      
      this.userData.location.latitude = data[0].geometry.location.lat();
      this.userData.location.longitude = data[0].geometry.location.lng();
    
    });
  }

}
