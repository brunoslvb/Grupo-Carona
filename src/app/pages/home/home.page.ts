import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loading: any;

  constructor(
    private nav: NavController,
    private loadingController: LoadingController,
    private userService: UserService,
  ) { }

  async logout(){
    
    this.loading = await this.loadingController.create({ spinner: 'crescent' });

    await this.loading.present();

    try {
      await this.userService.logout();
      await this.nav.navigateForward('login');
    } catch (err) {
      console.error(err);
    } finally {
      await this.loading.dismiss();
    }

  }

}
