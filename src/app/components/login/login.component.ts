import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  user: UserModel = new UserModel();

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  handleLoginClick() {
    this.authService.getUser(this.user).subscribe(
      (res: any) => {
        if (res.access_token) {
          this.authService.setToken(res);
          this.router.navigate(['home']);
        }
      },
      (error) => {
        //this.msgs.push({ severity: 'error', detail: 'Can not register!' });
      }
    );
  }
}
