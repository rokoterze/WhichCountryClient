import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';
import { RouterService } from '../services/router.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ipAddress: string = '';
  countryCode: string = '';
  responseData: any = null;
  flagData: any = "";

  constructor(private apiService: ApiService, protected routerService: RouterService) { }
  ngOnInit(): void {}


//#region Endpoints
  public fetchIpGeoLocation(ipAddress: string) {
    this.apiService.getIPGeoLocation(ipAddress).subscribe({
      next: (response) => {
        this.responseData = response;
        this.fetchCountryFlag(response.countryCode);
      },
      error: (error) => {
        console.error('Error while fetching IP data: ', error)
      }
    });
  }

  public fetchCountryFlag(countryCode: string) {
    this.apiService.getCountryFlag(countryCode).subscribe({
      next: (response) => {
        this.flagData = this.getBase64ImageSrc(response.content);
      },
      error: (error) => {
        console.error('Error fetching flag data:', error)
      }
    })
  }
//#endregion

//#region  Helper
  getBase64ImageSrc(base64Data: string): string {
    return `data:image/png;base64,${base64Data}`;
  }
//#endregion
}
