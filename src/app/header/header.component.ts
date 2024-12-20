import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();
  @Input() isSideBarOpen = false;
  isDarkMode = false;
  constructor(private themeService: ThemeService, private authService: AuthService,
    private router: Router
  ) {

  }
  toggleSidebar() {
    this.sidebarToggle.emit();
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme(this.isDarkMode);
  }
  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(theme => {
      this.isDarkMode = theme;
    })
  }
  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
