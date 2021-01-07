import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  loading: any;

  constructor(
    private builder: FormBuilder,
    private nav: NavController,
    private userService: UserService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.userService.isUserLoggedIn();

    this.registerForm = this.builder.group({
      prontuario: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
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
      const credentials = await this.userService.createUser(this.registerForm.value);

      console.log("User:", credentials);

      await this.nav.navigateForward('/login');

    } catch(err) { 
      console.error(err);
    } finally {
      await this.loading.dismiss();
    }

  }



}
