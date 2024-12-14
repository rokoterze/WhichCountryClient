import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-activity-dialog',
  standalone: true,
  imports: [],
  templateUrl: './plan-activity-dialog.component.html',
  styleUrl: './plan-activity-dialog.component.css'
})
export class PlanActivityDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PlanActivityDialogComponent>);

  onClose(): void {
    this.dialogRef.close();
  }
}
