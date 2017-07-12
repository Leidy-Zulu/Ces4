import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { RestauranteServicesModule } from '../restaurante-services/restaurante-services.module';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

var productList = null;

@Component({
  selector: 'dialog-order',
  templateUrl: 'dialog-order.html',
  styleUrls: ['./contact-list.component.css']
})

export class DialogOrder {

   public itemsContacts = null;
   public itemsContactsPhone = null;
   stateCtrl: FormControl;
  filteredStates: any;
  selectedContact = null;
  selectedAddress = null;
  
  constructor(public dialogRef: MdDialogRef<DialogOrder>, private services: RestauranteServicesModule, private router: Router) {

this.stateCtrl = new FormControl();
this.getContacts();

  }

  createOrderObject(contact, address, products){
    var order = {
      contact:contact._id, 
      address: address,
      status:"1",
      listProducts: this.createProductList(products)
    }
    return order;
  }

  createProductList(products){
    var productList = [];
    products.forEach(product => {
      if(product.selectedQuantity > 0){
        productList.push({
      product: product._id,
      quantity:product.selectedQuantity
       });
      }
    });
    return productList;
  }

  createOrder(){
    var order = this.createOrderObject(this.selectedContact, this.selectedAddress, productList);
   this.services.postOrder(order)
    .then(data => {
      this.itemsContacts = data;
      //alert("Orden creada");
      this.router.navigate(['/order']);
      this.dialogRef.close();

    

  }).catch(function(er){
    console.log(er);
  });
  }


  setSelectedContact(contact){
  
    this.itemsContactsPhone = contact.phoneList;
    this.selectedContact = contact;
    return this.contactFullName(contact);
  }

  contactFullName(contact){
    return contact.name + " " + contact.surname;
    
  }

    filterStates(val: string) {
    return val ? this.itemsContacts.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.itemsContacts;
  }

   getContacts(){
    this.services.getContact()
    .then(data => {
      this.itemsContacts = data;
  
    

  }).catch(function(er){
    console.log(er);
  });

}





}
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public itemsUsers = null;
   selectedOption: string;

  constructor(private services: RestauranteServicesModule, public dialog: MdDialog) { }

  ngOnInit() {
    this.getProduct();
  }

  disabledOpenDialog(){
  
    var count = 0;
    if(this.itemsUsers != null){
        this.itemsUsers.forEach(product => {
       
          if(product.selectedQuantity>0){
            count += product.selectedQuantity;
          }
    });
    }
    
    return count;
  }

  setSelectedProductQuantity(product, quantity){
    product.selectecQuantity= quantity;
    return quantity;
  }


  getProduct(){
    
    this.services.getProduct()
    .then(data => {
      this.itemsUsers = data;
     

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

openOrderDialog(itemsUsers){
 productList = itemsUsers;
let dialogRef = this.dialog.open(DialogOrder);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

}




