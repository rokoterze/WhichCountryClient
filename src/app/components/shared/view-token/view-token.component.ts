import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-token-dialog',
  standalone: true,
  imports: [],
  templateUrl: './view-token.component.html',
  styleUrl: './view-token.component.css'
})
export class ViewTokenDialogComponent implements OnInit {

  closeScope: string = "single";

  readonly dialogRef = inject(MatDialogRef<ViewTokenDialogComponent>);
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
