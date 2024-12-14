import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css'
})
export class ProfileDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProfileDialogComponent>);

  onClose(): void {
    this.dialogRef.close();
  }
}
