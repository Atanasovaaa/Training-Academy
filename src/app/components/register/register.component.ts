import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Message } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: UserModel = new UserModel();
  confirmPassword: string = '';
  msgs: Array<Message> = new Array<Message>(0);

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    // this.msgs.push({ severity: 'error', detail: 'This is Error!' });
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  onRegisterClick() {
    this.msgs = [];
    if (!this.user.email || this.user.email.trim() === '') {
      this.msgs.push({
        severity: 'error',
        detail: 'Please, enter valid email address!',
      });
    }
    if (!this.user.firstName || this.user.firstName.trim() === '') {
      this.msgs.push({
        severity: 'error',
        detail: 'Please, enter valid first name!',
      });
    }
    if (!this.user.lastName || this.user.lastName.trim() === '') {
      this.msgs.push({
        severity: 'error',
        detail: 'Please, enter valid last name!',
      });
    }
    if (!this.user.password || this.user.password.trim() === '') {
      this.msgs.push({
        severity: 'error',
        detail: 'Please, enter password!',
      });
    }
    if (
      !this.confirmPassword ||
      this.user.password.trim() !== this.confirmPassword.trim()
    ) {
      this.msgs.push({ severity: 'error', detail: "Passwords didn't match!" });
    }

    if (this.msgs.length > 0) {
      return;
    }

    this.authService.createUser(this.user).subscribe(
      (res: any) => {
        this.router.navigate(['login']);
      },
      (error) => {
        this.msgs.push({ severity: 'error', detail: 'Can not register!' });
      }
    );
  }
}
