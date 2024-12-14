import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  public goToLogin() {
    this.router.navigate(['/login']);
  }

  public goToRegister() {
    this.router.navigate(['/register']);
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public goToPlans() {
    this.router.navigate(['/plans']);
  }

  public goToApi() {
    this.router.navigate(['/api']);
  }

  public goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  public logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/home']);
  }
}
