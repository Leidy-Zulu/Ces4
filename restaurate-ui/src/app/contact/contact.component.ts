import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { RestauranteServicesModule } from '../restaurante-services/restaurante-services.module';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'dialog-contact',
  templateUrl: 'dialog-contact.html',
  styleUrls: ['./contact.component.css']
})

export class DialogContact {

   public itemsContacts = null;
   public itemsContactsPhone = null;
   stateCtrl: FormControl;

  
  constructor(public dialogRef: MdDialogRef<DialogContact>, private services: RestauranteServicesModule, private router: Router) {

  this.stateCtrl = new FormControl();

  }
}




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public itemsContacts = null;
  selectedOption: string;
  constructor(private services: RestauranteServicesModule, public dialog: MdDialog) { }

  ngOnInit() {
   this.getContactList();
  }

  getContactList(){
    this.services.getContact()
    .then(data => {
       console.log(data);
      this.itemsContacts = data;
  }).catch(function(er){
    console.log(er);
  });
  }

  openContactDialog(){
let dialogRef = this.dialog.open(DialogContact);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}