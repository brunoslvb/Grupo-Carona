import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carona',
  templateUrl: './carona.page.html',
  styleUrls: ['./carona.page.scss'],
})
export class CaronaPage implements OnInit {

  drivers;

  card;

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {

    this.userService.listMotoristas().subscribe(x => this.drivers = x);

  }

}
