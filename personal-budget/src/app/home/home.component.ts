import { Component } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  authenticate(action: string): void {
    const data = { username: this.username, password: this.password };

    if (action === 'login') {
      this.authService.login(data).subscribe((res) => {
        if (res && res.token) {
          const token = res.token;
          localStorage.setItem('jwt', token);
          this.navToDashboard();
        }
      });
    } else if (action === 'signup') {
      this.authService.signup(data).subscribe((res) => {
        if (res && res.token) {
          const token = res.token;
          localStorage.setItem('jwt', token);
          this.navToDashboard();
        }
      });
    }
  }

  navToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}

