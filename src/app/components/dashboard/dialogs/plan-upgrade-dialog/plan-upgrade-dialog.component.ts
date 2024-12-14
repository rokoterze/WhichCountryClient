import { AfterContentInit, Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../shared/snackbar/snackbar.service';
import { RouterService } from '../../../../services/router.service';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../shared/success-dialog/success-dialog.component';

// Interface
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
  planName: string
  planDescription: string,
  planPrice: number,
  planRequestLimit: string,
  isActive: boolean
}

@Component({
  selector: 'app-plan-upgrade-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './plan-upgrade-dialog.component.html',
  styleUrl: './plan-upgrade-dialog.component.css'
})
export class PlanUpgradeDialogComponent implements OnInit {
  selectedPlanId?: number;
  selectedPlan: SystemPlan | undefined;

  allSystemPlans: Array<SystemPlan> = []; //All System plans available in the system
  availableSystemPlans: Array<SystemPlan> = []; //Only the plans that are "bigger" than provided initalPlan
  initialPlan: UserPlan = {} as UserPlan; //Plan provided by parent component

  pricePlanDiff: any = 0;

  readonly dialogRef = inject(MatDialogRef<PlanUpgradeDialogComponent>);
  readonly dialog = inject(MatDialog);

  constructor(private apiService: ApiService, private snackbarService: SnackbarService, private routerService: RouterService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.allSystemPlans = data.systemPlans;
    this.initialPlan = data.selectedPlan;
    this.setAvailableSystemPlans();
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

  closeAllDialogs(): void {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.updateSelectedPlan();
    this.updatePricePlanDiff();
  }
  onPlanSelectionChange() {
    this.updateSelectedPlan();
    this.updatePricePlanDiff();
  }

  setAvailableSystemPlans() {
    const plans = this.allSystemPlans.filter(plan => plan.planId > this.initialPlan.planId!);
    this.availableSystemPlans.push(...plans);

    this.selectedPlanId = this.initialPlan.planId! + 1;
    this.selectedPlan = this.allSystemPlans.find(plan => plan.planId == this.selectedPlanId);
  }

  updateSelectedPlan() {
    this.selectedPlan = this.allSystemPlans.find(plan => plan.planId == this.selectedPlanId);
  }

  updatePricePlanDiff() {
    const initialPlanPrice = parseFloat(this.initialPlan.planPrice as unknown as string);
    const selectedPlanPrice = parseFloat(this.selectedPlan!.planPrice as unknown as string || '0');

    this.pricePlanDiff = selectedPlanPrice - initialPlanPrice;
  }


  //#region  API
  upgradeUserPlan(planToken: string, planId: number) {
    this.apiService.upgradeUserPlan(planToken, planId).subscribe((result: boolean) => {
      if (result === true) {
        this.openSuccessDialog("Plan upgraded successfully!", "all", '100ms', '100ms');
      }
      if (result === false) {
        this.openErrorDialog("Plan not upgraded!", "all", '100ms', '100ms');
      }
    });
  }
  //#endregion
}
