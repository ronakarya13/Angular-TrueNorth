import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log('data = ',data);
   }

  ngOnInit() {
  }

}