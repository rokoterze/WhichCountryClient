import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../services/api.service';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../shared/success-dialog/success-dialog.component';
import { ViewTokenDialogComponent } from '../../../shared/view-token/view-token.component';

//Interface
export interface RequestUsage {
  requestName: string;
  description: string;
  token: string;
  plan: string;
  usageCount: number;
}

@Component({
  selector: 'app-plan-usage-dialog',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './plan-usage-dialog.component.html',
  styleUrl: './plan-usage-dialog.component.css'
})

export class PlanUsageDialogComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<PlanUsageDialogComponent>);
  readonly dialog = inject(MatDialog);
  
  loggedInUserToken: any = null;
  userRequestUsage: Array<RequestUsage> = [];
  displayedColumns: string[] = ['requestName', 'description', 'token', 'plan', 'usageCount'];
  dataSource = new MatTableDataSource(this.userRequestUsage);

  constructor(private apiService: ApiService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loggedInUserToken = this.apiService.getToken();
    if (this.loggedInUserToken.tokenValue != '') {
      this.getUserPlanRequestUsage();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  // #region API
  async getUserPlanRequestUsage() {
    this.apiService.getUserPlanRequestUsage().subscribe({
      next: (response: any) => {
        this.userRequestUsage = response.map((usage: any) => ({
          requestName: usage.requestName,
          description: usage.description,
          token: usage.token,
          plan: usage.plan,
          usageCount: usage.usageCount
        }));
        this.dataSource.data = this.userRequestUsage;
      
        console.log("Check: ",this.userRequestUsage);
      },
      error: (err) => {
        this.openErrorDialog("Error occured while processing the request. Please check you internet connection.", '100ms', '100ms');
        console.error('Error fetching user plans:', err);
      }
    });
  }
  //#endregion

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

    openViewTokenDialog(message: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(ViewTokenDialogComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true,
        data: message
      });
    }
    //#endregion
}
