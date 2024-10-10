import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
constructor(protected routerService: RouterService) {}
}
