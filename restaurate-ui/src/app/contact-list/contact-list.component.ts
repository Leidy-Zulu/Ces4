import { Component, OnInit } from '@angular/core';
import { RestauranteServicesModule } from '../restaurante-services/restaurante-services.module';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public itemsUsers = null;

  constructor(private services: RestauranteServicesModule) { }

  ngOnInit() {
    this.getProduct();
  }


  getProduct(){
     console.log('paso por aquí');
    this.services.getProduct()
    .then(data => {
      this.itemsUsers = data;
      console.log(data);

  }).catch(function(er){
    console.log(er);
  });

}

getCount(number){
 let res = [];
for (let i = 1; i <= number; i++) {
        res.push(i);
      }
      return res;
}
}

