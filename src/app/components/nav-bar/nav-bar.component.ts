import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
    private route: ActivatedRoute,
    private router:Router,
  ) {}

  back(): void {
    this.router.navigate(["../.."], { relativeTo: this.route });
  }
}
