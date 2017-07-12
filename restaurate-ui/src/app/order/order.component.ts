import { Component, OnInit } from '@angular/core';
import { RestauranteServicesModule } from '../restaurante-services/restaurante-services.module';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orderList = null;
  constructor(private services: RestauranteServicesModule) { }

  ngOnInit() {
    this.getOrderList();
  }
  contactFullName(contact){
    return contact.name + " " + contact.surname;
    
  }

  price(listProduct){
    var value = 0;
    listProduct.forEach(product => {
      value += product.product.price;
    });
    return value;


  }

  status(value){
    if(value == 1){
      return "Pendiente"
    }else{
      return "Finalizada"
    }
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
