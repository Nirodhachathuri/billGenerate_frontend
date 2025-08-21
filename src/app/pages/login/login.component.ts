import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // Assuming the API returns a token or success flag
        console.log(res);
        if (res.status == 'success') {
          localStorage.setItem('token', res.token); // store JWT if backend returns it
          this.router.navigate(['/invoice']); // redirect to invoice page
        } else {
          this.errorMessage = res.message || 'Invalid username or password';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}
