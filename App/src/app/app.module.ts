import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './home/books/books.component';
import { BooksdetailComponent } from './home/booksdetail/booksdetail.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksdetailComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut : 3000,
      positionClass : 'toast-bottom-left',
      preventDuplicates : false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
