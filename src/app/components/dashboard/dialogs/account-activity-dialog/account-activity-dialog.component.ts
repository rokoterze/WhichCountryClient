import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-account-activity-dialog',
  standalone: true,
  imports: [],
  templateUrl: './account-activity-dialog.component.html',
  styleUrl: './account-activity-dialog.component.css'
})
export class AccountActivityDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AccountActivityDialogComponent>);

  onClose(): void {
    this.dialogRef.close();
  }
}
