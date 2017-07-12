import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { RestauranteServicesModule } from '../restaurante-services/restaurante-services.module';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    public orderList = null;
  constructor(private services: RestauranteServicesModule) { }

  ngOnInit() {
    this.getOrderList()
  }

   contactFullName(contact){
    return contact.name + " " + contact.surname;
    
  }

   getOrderList(){
    this.services.getOrder()
    .then(data => {
       console.log(data);
      this.orderList = data;
     

  }).catch(function(er){
    console.log(er);
  });

}

}
