import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { MainWindowComponent } from './main-window/main-window.component';
import { ContactListComponent } from './contact-list/contact-list.component';



export const routeConfig: Routes = [
    {
        path: '',
        component: MainWindowComponent,
        canActivate: [AuthGuard],
        children: [  { path: 'home', component: ContactListComponent }]
    }
];
