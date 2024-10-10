import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  password_first: string = '';
  password_second: string = '';

  constructor(protected routerService: RouterService) { }

  register() {
  }
}
