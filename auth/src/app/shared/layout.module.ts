import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatTooltipModule
} from '@angular/material';


const MAT = [
  FlexLayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatTooltipModule
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
