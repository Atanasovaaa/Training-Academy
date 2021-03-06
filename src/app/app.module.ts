import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TopNavigationComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, CourseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
