import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { RouterService } from './router.service';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private ipApiUrl: string = 'https://api.ipify.org?format=json';

  constructor(private http: HttpClient, private routerService: RouterService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  // #region Token and Header
  public getToken(): any {
    var response = localStorage.getItem("user");

    if (response == null) {
      console.log("Token not found!");
    }
    else {
      response = JSON.parse(response);
      return response;
    }
  }

  public getHeaders(): HttpHeaders {
    const token = this.getToken();

    return new HttpHeaders({
      'Authorization': `Bearer ${token.token}`,
      'Content-Type': 'application/json'
    });
  }
  //#endregion

  // #region PublicAPI
  getVisitorIpAddress(): Observable<{ ip: string }> {
    return this.http.get<{ ip: string }>(this.ipApiUrl);
  }

  getIPGeoLocationSystem(ipAddress: string): Observable<any> {
    const url = `${environment.apiEndpoints.geoLocationSystem}${ipAddress}`;

    return this.http.get(url);
  }
  // #endregion

  // #region Auth
  postLogin(payload: any) {
    const url = `${environment.apiEndpoints.login}`;

    const observer = {
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify({ token: response.tokenValue }));
        localStorage.setItem('username', payload.username);
        this.router.navigate(['/dashboard'])
      },
      error: (error: any) => {
        console.log("Error: ", error);
      },
      complete: () => {
        console.log("Request completed.");
      }
    }
    this.http.post(url, payload).subscribe(observer);
  }

  postRegister(payload: any) {
    const url = `${environment.apiEndpoints.register}`;

    const observer = {
      next: (response: any) => {
        console.log("Response: ", response);
      },
      error: (error: any) => {
        console.log("Error: ", error);
      },
      complete: () => {
        alert("You have been successfully registered! Please Log In.")
        this.routerService.goToLogin();
      }
    }
    this.http.post(url, payload).subscribe(observer);
  }

  //#endregion

  // #region User
  getUserPlans(): Observable<any> {
    const url = `${environment.apiEndpoints.getUserPlans}`;
    const headers = this.getHeaders();
    const options = { headers };
    return this.http.get(url, options);
  }

  getUserPlanRequestUsage(): Observable<any> {
    const url = `${environment.apiEndpoints.getUserPlanRequestUsage}`;
    const headers = this.getHeaders();
    const options = { headers };
    return this.http.get(url, options);
  }

  deactivateUserPlan(planToken: string): Observable<boolean> {
    const url = `${environment.apiEndpoints.deactivateUserPlan}${planToken}`;
    const headers = this.getHeaders();
    const options = { headers };

    return this.http.post(url, null, options).pipe(
      map((response: any) => {
        console.log("Response: ", response);
        return true;
      }),
      catchError((error: any) => {
        console.error("Error: ", error);
        return of(false);
      })
    );
  }

  activateUserPlan(planToken: string): Observable<boolean> {
    const url = `${environment.apiEndpoints.activateUserPlan}${planToken}`;
    const headers = this.getHeaders();
    const options = { headers };

    return this.http.post(url, null, options).pipe(
      map((response: any) => {
        console.log("Response: ", response);
        return true;
      }),
      catchError((error: any) => {
        console.error("Error: ", error);
        return of(false);
      })
    );
  }

  assignNewUserPlan(username: string, planId: number): Observable<boolean> {
    const url = `${environment.apiEndpoints.assignNewPlanUrl(username, planId)}`;
    const headers = this.getHeaders();
    const options = { headers };

    return this.http.post(url, null, options).pipe(
      map((response: any) => {
        console.log("Response: ", response);
        return true;
      }),
      catchError((error: any) => {
        console.error("Error: ", error);
        return of(false);
      })
    );
  }

  upgradeUserPlan(planToken: string, newPlan: number): Observable<boolean>
  {
    const url = `${environment.apiEndpoints.upgradeUserPLan}`;
    const headers = this.getHeaders();
    const options = {headers};
    const payload = {planToken, newPlan}

    return this.http.post(url, payload, options).pipe(
      map((response: any) => {
        console.log("Response: ", response);
        return response;
      }),
      catchError((error: any) => {
        console.error("Error: ", error);
        return of(false);
      })
    );
  }
  //#endregion

  // #region Lookup
  getActiveSystemPlans(): Observable<any> {
    const url = `${environment.apiEndpoints.getActiveSystemPlans}`;
    return this.http.get(url);
  }
  // #endregion


  // #region Helper
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user') !== null;
    }
    return false;
  }

  getUsername(): string {
    if (isPlatformBrowser(this.platformId)) {
      const username = localStorage.getItem('username');
      if (username != null) {
        return username;
      }
      else {
        return "";
      }
    }
    return "";
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
  //#endregion
}