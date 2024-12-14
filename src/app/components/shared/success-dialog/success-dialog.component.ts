import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent implements OnInit {

  closeScope: string = "single";

  readonly dialogRef = inject(MatDialogRef<SuccessDialogComponent>);
  readonly dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.closeScope != null) {
      this.closeScope = data.closeScope;
    }
  }

  onClose(): void {
    if (this.closeScope == "single") {
      this.dialogRef.close();
    }
    else if (this.closeScope == "all") {
      this.dialog.closeAll();
      window.location.reload();
    }
  }

  ngOnInit(): void {
  }
}
