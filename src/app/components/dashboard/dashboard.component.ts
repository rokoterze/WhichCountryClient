import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from '../shared/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { RouterService } from '../../services/router.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
import { NewPlanDialogComponent } from './dialogs/new-plan-dialog/new-plan-dialog.component';
import { ProfileDialogComponent } from './dialogs/profile-dialog/profile-dialog.component';
import { PlanUsageDialogComponent } from './dialogs/plan-usage-dialog/plan-usage-dialog.component';
import { PlanUpgradeDialogComponent } from './dialogs/plan-upgrade-dialog/plan-upgrade-dialog.component';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';
import { PlanActivityDialogComponent } from './dialogs/plan-activity-dialog/plan-activity-dialog.component';
import { AccountActivityDialogComponent } from './dialogs/account-activity-dialog/account-activity-dialog.component';
import { PlanProfileDialogComponent } from './dialogs/plan-profile-dialog/plan-profile-dialog.component';

//Interface
export interface UserPlan {
  planId?: number;
  planName: string;
  planDescription: string;
  planPrice: number;
  tokenValue: string;
  planStart: string;
  planEnd: string;
  isActive: boolean;
}

export interface SystemPlan {
  planId: number,
  planName: string,
  planDescription: string,
  planPrice: number,
  planRequestLimit: string,
  isActive: boolean
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FooterComponent, CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,

    // Dialogs
    NewPlanDialogComponent,
    PlanUsageDialogComponent,
    PlanActivityDialogComponent,
    AccountActivityDialogComponent,
    ProfileDialogComponent,
    PlanProfileDialogComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private apiService: ApiService, protected routerService: RouterService, private snackbarService: SnackbarService) { }
  dateToday: any = Date.now();

  loggedInUserToken: any = null;
  userId: any = null;
  userPlans: Array<UserPlan> = [];
  systemPlans: Array<SystemPlan> = [];
  selectedPlan: UserPlan = {} as UserPlan;

  displayedColumns: string[] = ['planName', 'planDescription', 'planPrice', 'planStart', 'planEnd', 'tokenValue', 'upgrade', 'isActive', 'update'];
  dataSource = new MatTableDataSource(this.userPlans);

  readonly dialog = inject(MatDialog);

  openPlanDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NewPlanDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: this.systemPlans
    });
  }

  openPlanRequestUsageDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PlanUsageDialogComponent, {
      width: '90%',
      height: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    });
  }

  openPlanActivityDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PlanActivityDialogComponent, {
      width: '90%',
      height: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    });
  }

  openAccountActivityDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AccountActivityDialogComponent, {
      width: '90%',
      height: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    });
  }

  openProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProfileDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    });
  }

  openPlanUpgradeDialog(planName: string, planToken: string, enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.updateSelectedPlan(planName, planToken);
    this.dialog.open(PlanUpgradeDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        systemPlans: this.systemPlans,
        selectedPlan: this.selectedPlan
      }
    });
  }

  // openPlanProfileDialog(planToken: string, enterAnimationDuration: string, exitAnimationDuration: string): void {

  //   this.dialog.open(PlanProfileDialogComponent, {
  //     width: '80vw',
  //     height: '80vh',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //     disableClose: true,
  //     data: {
  //       planToken
  //     }
  //   });
  // }

  //#region Message Dialogs
  openErrorDialog(errorMessage: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: errorMessage
    });
  }

  openSuccessDialog(successMessage: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: successMessage
    });
  }
  //#endregion
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loggedInUserToken = this.apiService.getToken();
    if (this.loggedInUserToken.tokenValue != '') {
      this.fetchUserPlans();
      this.getActiveSystemPlans();
    }
  }

  updateSelectedPlan(planName: string, tokenValue: string) {
    const plan = this.systemPlans.find(plan => plan.planName == planName);
    this.selectedPlan.planId = plan!.planId;
    this.selectedPlan.planName = plan!.planName;
    this.selectedPlan.planPrice = plan!.planPrice;
    this.selectedPlan.tokenValue = tokenValue;
  }

  // #region API
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchUserPlans() {
    this.apiService.getUserPlans().subscribe({
      next: (response: any) => {
        this.userPlans = response.map((plan: any) => ({
          planName: plan.planName,
          planDescription: plan.planDescription,
          planPrice: plan.planPrice,
          tokenValue: plan.tokenValue,
          planStart: this.convertTimestamp(plan.planStart),
          planEnd: this.convertTimestamp(plan.planEnd),
          isActive: plan.isActive,
        }));
        this.dataSource.data = this.userPlans;
      },
      error: (err) => {
        this.openErrorDialog("Error occured while processing the request. Please check you internet connection.", '100ms', '100ms');
        console.error('Error fetching user plans:', err);
      }
    });
  }

  deactivateUserPlan(planToken: string) {
    this.apiService.deactivateUserPlan(planToken).subscribe((result: boolean) => {
      if (result) {
        this.fetchUserPlans();
        this.snackbarService.openSnackBar("Plan deactivated successfully!", "Close");
      } else {
        this.openErrorDialog("Error occured while processing the request. Please check you internet connection.", '100ms', '100ms');
      }
    });
  }

  activateUserPlan(planToken: string) {
    this.apiService.activateUserPlan(planToken).subscribe((result: boolean) => {
      if (result) {
        this.fetchUserPlans();
        this.snackbarService.openSnackBar("Plan activated successfully!", "Close");
      } else {
        this.openErrorDialog("Error occured while processing the request. Please check you internet connection.", '100ms', '100ms');
      }
    });
  }

  getActiveSystemPlans() {
    this.apiService.getActiveSystemPlans().subscribe({
      next: (response: any) => {
        this.systemPlans = response.map((plan: any) => ({
          planId: plan.planId,
          planName: plan.planName,
          planDescription: plan.planDescription,
          planPrice: plan.price,
          planRequestLimit: plan.requestLimit,
          isActive: plan.isActive,
        }));
        console.log(this.systemPlans);
      },
      error: (err) => {
        this.openErrorDialog("Error occured while processing the request. Please check you internet connection.", '100ms', '100ms');
        console.error('Error fetching system plans:', err);
      }
    });
  }

  //  #endregion

  // #region Helper Methods

  copyToClipboard(tokenValue: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tokenValue).then(() => {
        this.snackbarService.openSnackBar("Token copied successfully!", "Close");
      }).catch(err => {
        console.error('Failed to copy token:', err);
      });
    }
  }

  convertTimestamp(timestamp: string): string {
    let time = timestamp.replace('T', ' ');
    const [year, month, day] = time.split(" ")[0].split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  isExpired(planDate: string) {
    var parsed = new Date(planDate);
    if (parsed < this.dateToday) {
      return true;
    }
    else {
      return false;
    }
  }

  //#endregion
}