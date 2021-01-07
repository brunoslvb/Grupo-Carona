import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  forgotForm: FormGroup;
  loading: any;

  constructor(
    private nav: NavController,
    private builder: FormBuilder,
    private userService: UserService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.forgotForm = this.builder.group({
      email: ['', Validators.required]
    });
  }

  async forgotPassword(){

    let domain = (<HTMLInputElement>document.getElementById('domain')).value;

    this.forgotForm.value.email += domain;

    this.loading = await this.loadingController.create({ spinner: 'crescent' });
    await this.loading.present();

    try {
      await this.userService.forgotPassword(this.forgotForm.value.email);
      await this.nav.navigateForward('login');
    } catch (err) {
      console.error(err);
    } finally {
      await this.loading.dismiss();
    }
  }

}
