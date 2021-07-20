import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BooksComponent } from './home/books/books.component';
import { BooksdetailComponent } from './home/booksdetail/booksdetail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  children: [

      { path: 'bookslist', component: BooksComponent},
      { path: 'booksdetail', component: BooksdetailComponent},
  ] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
