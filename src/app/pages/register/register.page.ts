import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

declare var google;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  loading: any;
  addresses: Array<{
    description: string;
  }> = [];
  coords: Array<Number>;

  private googleMapsPlaces = new google.maps.places.AutocompleteService();
  private googleMapsGeocoder = new google.maps.Geocoder();

  constructor(
    private builder: FormBuilder,
    private nav: NavController,
    private userService: UserService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.registerForm = this.builder.group({
      prontuario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async createUser(){

    let domain = (<HTMLInputElement>document.getElementById('domain')).value;

    this.registerForm.value.email += domain;

    this.loading = await this.loadingController.create({ spinner: 'crescent' });

    await this.loading.present();

    try {
      
      const data = {
        prontuario: this.registerForm.value.prontuario,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        birthday: this.registerForm.value.birthday,
        location: {
          address: this.registerForm.value.address,
          latitude: this.coords[0],
          longitude: this.coords[1]
        }
      };
      
      const credentials = await this.userService.createUser(this.registerForm.value);
      
      await this.userService.createUserInFirestore(data);

      console.log("User:", credentials);

      await this.nav.navigateForward('/login');

    } catch(err) { 
      console.error(err);
    } finally {
      await this.loading.dismiss();
    }

  }

  async searchAddress(){
    
    if(!this.registerForm.value.address.trim().length) {
      this.addresses = [];
      return;
    }; 

    this.googleMapsPlaces.getPlacePredictions({ input: this.registerForm.value.address }, predictions => {
      this.addresses = predictions;
    });
  }

  async searchSelected(address: string) {
    
    (<HTMLInputElement>document.getElementById('address')).value = address;

    this.registerForm.value.address = address;

    this.addresses = [];

    await this.googleMapsGeocoder.geocode({
      address
    }, (data) => {
      
      this.coords = [data[0].geometry.location.lat(), data[0].geometry.location.lng()];
    
    });
  }



}
