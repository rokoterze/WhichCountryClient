import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { RouterService } from '../services/router.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  responseData: any = null;
  responseToken: string = "";

  constructor(private http: HttpClient, protected routerService: RouterService) { }

  //TODO: Transfer this to api.services.ts
  login() {
    const url = `${environment.login}`;

    const payload = {
      username: this.username,
      password: this.password
    }

    const observer = {
      next: (response: any) => {
        console.log("Response: ", response);
        this.responseToken = response.token;
        console.log("Token: " + this.responseToken)

        localStorage.setItem('user', JSON.stringify({ token: this.responseToken }))
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

  //#region Helper
  showPassword(): void {
    const x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
