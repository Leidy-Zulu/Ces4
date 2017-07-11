import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Oauthv2TokenHandlerService } from '../oauthv2-token-handler/oauthv2-token-handler.service';


@Injectable()
export class AuthGuard implements CanActivate {

constructor(private tokenHandlerService: Oauthv2TokenHandlerService){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenHandlerService.isValidToken()) {
      return true;
    }
    let accessCode = this.tokenHandlerService.getAccessCode();
    if (accessCode) {
      return this.tokenHandlerService.exchangeToken(accessCode).map((token) => true);
    }
    location.href = 'http://localhost:3000/oauth2/authorize?client_id=domicilio&response_type=code&redirect_uri=http://localhost:4200';
  }
}
