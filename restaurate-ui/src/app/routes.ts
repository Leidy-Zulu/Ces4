import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { MainWindowComponent } from './main-window/main-window.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { OrderListComponent } from './order-list/order-list.component';



export const routeConfig: Routes = [
    {
        path: '',
        component: MainWindowComponent,
        canActivate: [AuthGuard],
        children: [  { path: 'home', component: ContactListComponent },  { path: 'order', component: OrderComponent }, { path: 'orderlist', component: OrderListComponent }]
    }

  

   
];
