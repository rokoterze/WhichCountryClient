import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-profile-dialog',
  standalone: true,
  imports: [],
  templateUrl: './plan-profile-dialog.component.html',
  styleUrl: './plan-profile-dialog.component.css'
})
export class PlanProfileDialogComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<PlanProfileDialogComponent>);
  token: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.token = this.data.planToken;
    console.log(this.token);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
