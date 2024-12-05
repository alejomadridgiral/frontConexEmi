import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePublicationComponent } from './components/create-publication/create-publication.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home_page/home_page.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {path:"" , component : HomePageComponent},
  {path:"contacto" , component : FooterComponent},
  {path:"entrepreneurship" , component : MainComponent},
  {path:"createPublication" , component: CreatePublicationComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
