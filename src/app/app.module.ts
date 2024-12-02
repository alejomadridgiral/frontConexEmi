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

@NgModule({
  declarations: [
    AppComponent,
    EntrepreneurshipComponent,
    CategoryComponent,
    HeaderComponent,
    ReactionComponent,
    CommentsComponent,
    ReplaceUnderscorePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    EntrepreneurshipService,
    CategoryService,
    ReactionService,
    CommentsService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
