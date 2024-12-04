import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { EntrepreneurshipComponent } from './components/entrepreneurship/entrepreneurship.component';
import { EntrepreneurshipService } from './services/entrepreneurship.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/category.service';
import { ReplaceUnderscorePipe } from './replace-underscore.pipe';
import { HeaderComponent } from './components/header/header.component';
import { ReactionComponent } from './components/reaction/reaction.component';
import { ReactionService } from './services/reaction.service';
import { CommentsComponent } from './components/comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from './services/comments.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreatePublicationComponent } from './components/create-publication/create-publication.component';
import { MainComponent } from './components/main/main.component';
import { CityService } from './services/city.service';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CommentsComponent,
    CreatePublicationComponent,
    EntrepreneurshipComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    ReactionComponent,
    RegisterComponent,
    ReplaceUnderscorePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    CategoryService,
    CityService,    
    CommentsService,
    EntrepreneurshipService,
    ReactionService,
    UserService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
