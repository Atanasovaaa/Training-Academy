import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css'],
})
export class TopNavigationComponent implements OnInit {
  @Input() isAuthenticated: boolean;

  constructor(private authService: AuthService, public router: Router) {}
  userName: string;

  ngOnInit(): void {
    let profile = this.authService.getProfile();
    this.userName = profile.firstName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
