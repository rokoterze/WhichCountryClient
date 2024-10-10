import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css'
})
export class ApiComponent {
  constructor(protected routerService: RouterService) { }
}
