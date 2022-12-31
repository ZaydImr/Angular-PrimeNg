import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrRoutingModule } from './br-routing.module';
import { BrComponent } from './br.component';
import { AddEditBrComponent } from './add-edit-br/add-edit-br.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    BrComponent,
    AddEditBrComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrRoutingModule,
    ButtonModule,
    InputTextModule
  ]
})
export class BrModule { }
