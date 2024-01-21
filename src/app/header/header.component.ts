import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userId: number | null = null;
  userIdToUpdate: number | null = null;
  userIds: number[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserDetails(): void {
    if (this.userId) {
      this.router.navigate(['/user/', this.userId]);
    }
  }

}
