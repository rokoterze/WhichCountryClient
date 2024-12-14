import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../shared/snackbar/snackbar.service';
import { RouterService } from '../../../../services/router.service';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../shared/success-dialog/success-dialog.component';

// Interface
export interface SystemPlan {
  planId: number,
  planName: string
  planDescription: string,
  planPrice: string,
  planRequestLimit: string,
  isActive: boolean
}

@Component({
  selector: 'app-new-plan-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-plan-dialog.component.html',
  styleUrl: './new-plan-dialog.component.css'
})
export class NewPlanDialogComponent implements OnInit {
  selectedPlanId: number = 1;
  selectedPlan: SystemPlan | undefined;
  systemPlans: Array<SystemPlan> = [];

  readonly dialogRef = inject(MatDialogRef<NewPlanDialogComponent>);
  readonly dialog = inject(MatDialog);

  constructor(private apiService: ApiService, private snackbarService: SnackbarService, private routerService: RouterService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.systemPlans = data;
  }
  openErrorDialog(errorMessage: string, closeScope: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: { errorMessage, closeScope }
    });
  }

  openSuccessDialog(successMessage: string, closeScope: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: { successMessage, closeScope }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.updateSelectedPlan();
  }
  
  onPlanSelectionChange() {
    this.updateSelectedPlan();
  }

  updateSelectedPlan() {
    this.selectedPlan = this.systemPlans.find(plan => plan.planId == this.selectedPlanId);
  }

  assignNewUserPlan() {
    const username = this.apiService.getUsername();
    if (username != "") {
      this.apiService.assignNewUserPlan(username, this.selectedPlanId).subscribe((result: boolean) => {
        if (result === true) {
          this.openSuccessDialog("Plan activated successfully!", "all", '100ms', '100ms');
        }
        if (result === false) {
          this.openErrorDialog("Plan not activated!", "all", '100ms', '100ms');
        }
      });
    }
  }
  //#endregion
}
