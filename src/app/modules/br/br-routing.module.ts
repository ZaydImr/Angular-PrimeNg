import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrComponent } from './br.component';

const routes: Routes = [
  { path: '', component: BrComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrRoutingModule { }
