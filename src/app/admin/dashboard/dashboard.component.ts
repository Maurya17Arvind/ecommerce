import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public cards = [
    {
      title: 'Add Product',
      button: 'Add Product',
      routerLink: '/admin/add-items'
    },
    {
      title: 'View Product',
      button: 'View Product',
      routerLink: '/admin/view-items'
    }
  ]
  public addItem(): void {
    this.router.navigate(['add-items'])
  }
}
