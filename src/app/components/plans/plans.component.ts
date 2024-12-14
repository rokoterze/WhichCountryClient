import { Component } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
constructor(protected routerService: RouterService, protected apiService: ApiService) {}
}
