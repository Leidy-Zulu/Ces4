import { Component, OnInit } from '@angular/core';
import { RestauranteServicesModule } from '../restaurante-services/restaurante-services.module';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(service: RestauranteServicesModule) { }

  ngOnInit() {
  }

}
