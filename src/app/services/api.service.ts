import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) {}

  private getToken(): any {
    var response = localStorage.getItem("user");

    if(response == null) {
      console.log("Token not found!");
    }
    else {
      console.log("Token found: " + response)
      
      response = JSON.parse(response);
      return response;
    }
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();

    return new HttpHeaders({
      'Authorization': `Bearer ${token.token}`,
      'Content-Type': 'application/json'
    });
  }

  getIPGeoLocation(ipAddress: string): Observable<any> {
    const url = `${environment.getIPGeoLocation}${ipAddress}`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  getCountryFlag(countryCode: string): Observable<any> {
    const url = `${environment.getCountryFlag}${countryCode}`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  postLogin(payload: any) {
    const url = `${environment.login}`;

    const observer = {
      next: (response: any) => {
        console.log("Response: ", response);
        localStorage.setItem('user', JSON.stringify({token: response.token}))
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
}