import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneurshipComponent } from './components/entrepreneurship/entrepreneurship.component';

const routes: Routes = [
  {path:"" , component : EntrepreneurshipComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
