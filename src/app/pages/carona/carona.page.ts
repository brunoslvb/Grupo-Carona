import { Component, OnInit } from '@angular/core';
import { CaronaService } from 'src/app/services/carona.service';

@Component({
  selector: 'app-carona',
  templateUrl: './carona.page.html',
  styleUrls: ['./carona.page.scss'],
})
export class CaronaPage implements OnInit {

  listofcards;
  constructor(
  private card: CaronaService
    ) { }

  ngOnInit() {
  this.card.listMotoristas('card').subscribe(x => this.listofcards = x);
  }


}
