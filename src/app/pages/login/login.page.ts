import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loading: any;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private loadingController: LoadingController,
    private nav: NavController
  ) { }

  ngOnInit() {
    
    this.userService.isUserLoggedIn();
    
    this.loginForm = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  async login() {

    this.loading = await this.loadingController.create({ spinner: 'crescent' });
    
    await this.loading.present();

    try {
      const user = await this.userService.login(this.loginForm.value);
      console.log(user);
      await this.nav.navigateForward('home');
    } catch (err) {
      console.error(err);
    } finally {
      await this.loading.dismiss();
    }

  }

  async logout(){
    await this.userService.logout();
  }

}
