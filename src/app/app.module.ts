import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { EntrepreneurshipComponent } from './components/entrepreneurship/entrepreneurship.component';
import { EntrepreneurshipService } from './services/entrepreneurship.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    EntrepreneurshipComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    EntrepreneurshipService,
    CategoryService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
