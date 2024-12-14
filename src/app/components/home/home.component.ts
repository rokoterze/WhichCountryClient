import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RouterService } from '../../services/router.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ipAddress: string = '';
  countryCode: string = '';
  responseData: any = null;
  flagData: any = '';
  visitorIpAddress: string = '';

  readonly dialog = inject(MatDialog);

  constructor(protected apiService: ApiService, protected routerService: RouterService) { }

  ngOnInit(): void {
    this.apiService.getVisitorIpAddress().subscribe(
      (data) => {
        this.visitorIpAddress = data.ip;
        console.log(this.visitorIpAddress);

        this.ipAddress = data.ip;
      },
      (error) => {
        console.error('Error fetching IP address', error);
      }
    );
  }

  openErrorDialog(errorMessage: string ,enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: errorMessage
    });
  }

  //#region Endpoints
  public fetchIpGeoLocation(ipAddress: string) {

    var checkIpAddress = this.ipAddressValidator(ipAddress);
    if (checkIpAddress) {
      this.apiService.getIPGeoLocationSystem(ipAddress).subscribe({
        next: (response) => {
          this.responseData = response;
          this.flagData = this.getBase64ImageSrc(response.countryFlagBase64);
        },
        error: (error) => {
          console.error('Error while fetching IP data: ', error)
          this.openErrorDialog("Daily API request limit reached!",'100ms', '100ms');
        }
      });
    }
  }
  //#endregion

  //#region  Helper
  getBase64ImageSrc(base64Data: string): string {
    return `data:image/png;base64,${base64Data}`;
  }

  ipAddressValidator(ipAddress: string) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
      return true;
    }
    else {
      this.openErrorDialog("Incorrect IP address format inserted.",'100ms', '100ms');
      return false;
    }
  }
  //#endregion
}
