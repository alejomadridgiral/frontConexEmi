import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePublicationComponent } from './components/create-publication/create-publication.component';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path:"" , component : MainComponent},
  {path:"createPublication" , component: CreatePublicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
