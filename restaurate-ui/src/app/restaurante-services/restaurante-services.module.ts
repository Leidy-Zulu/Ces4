import { NgModule } from '@angular/core';
import { Resource } from 'angular-resource';
import { CommonModule } from '@angular/common';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/Rx';
import { Oauthv2TokenHandlerService } from '../oauthv2-token-handler/oauthv2-token-handler.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class RestauranteServicesModule { 

  constructor(private http: Http, private security: Oauthv2TokenHandlerService) { }

public static readonly API_BASE: string = 'http://localhost:3000';
public static readonly PRODUCTS: string = '/product';
public static readonly ORDER: string = '/order';
public static readonly CONTACTS: string = '/contacts';



getProduct() {
    return new Promise(resolve =>{

      this.http.get(RestauranteServicesModule.API_BASE+RestauranteServicesModule.PRODUCTS, { headers: this.security.getHeader() })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

getContact() {
     return new Promise(resolve =>{
      this.http.get(RestauranteServicesModule.API_BASE+RestauranteServicesModule.CONTACTS)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

getOrder() {
   return new Promise(resolve =>{
      this.http.get(RestauranteServicesModule.API_BASE+RestauranteServicesModule.ORDER)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postProduct() {
    return new Promise(resolve =>{
      this.http.post(RestauranteServicesModule.API_BASE+RestauranteServicesModule.PRODUCTS,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

postContact() {
     return new Promise(resolve =>{
      this.http.post(RestauranteServicesModule.API_BASE+RestauranteServicesModule.CONTACTS,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

postOrder() {
   return new Promise(resolve =>{
      this.http.post(RestauranteServicesModule.API_BASE+RestauranteServicesModule.ORDER,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  } 

  deleteProduct() {
    return new Promise(resolve =>{
      this.http.delete(RestauranteServicesModule.API_BASE+RestauranteServicesModule.PRODUCTS,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

deleteContact() {
     return new Promise(resolve =>{
      this.http.delete(RestauranteServicesModule.API_BASE+RestauranteServicesModule.CONTACTS,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

deleteOrder() {
   return new Promise(resolve =>{
      this.http.delete(RestauranteServicesModule.API_BASE+RestauranteServicesModule.ORDER,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  } 

updateProduct() {
    return new Promise(resolve =>{
      this.http.put(RestauranteServicesModule.API_BASE+RestauranteServicesModule.PRODUCTS,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

updateContact() {
     return new Promise(resolve =>{
      this.http.put(RestauranteServicesModule.API_BASE+RestauranteServicesModule.CONTACTS,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

updateOrder() {
   return new Promise(resolve =>{
      this.http.put(RestauranteServicesModule.API_BASE+RestauranteServicesModule.ORDER,"")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  } 

        

}

