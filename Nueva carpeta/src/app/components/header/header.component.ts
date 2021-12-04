import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterappApiService } from 'src/app/services/registerapp-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() back: string;
  @Input() logout: boolean;

  constructor(
    private router: Router,
    private regApiService: RegisterappApiService
  ) {}

  ngOnInit() {}

  logoutUser() {
    this.regApiService.logoutUser().subscribe((res) => {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('accessToken');
      this.router.navigate(['/']);
    });
  }
}
