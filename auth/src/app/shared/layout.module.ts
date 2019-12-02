import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
} from '@angular/material';


const MAT = [
  FlexLayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MAT
  ],
  exports: [
    MAT
  ]
})
export class LayoutModule { }
