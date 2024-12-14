import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterService } from '../../services/router.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  //TODO: Fecth from API
  planOptions =
    [
      {
        id: 1,
        value: 'Free'
      },
      {
        id: 2,
        value: 'Standard'
      },
      {
        id: 3,
        value: 'Professional'
      }
    ];

  constructor(protected routerService: RouterService, private fb: FormBuilder, private service: ApiService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_second: ['', Validators.required],
      userPlan: ['1', Validators.required],
    })
  }

  register() {
    this.service.postRegister(this.registerForm.value);
    console.log(this.registerForm.value);
  }

  comparePassword() {
    if (this.registerForm.value.password !== this.registerForm.value.password_second) {
      return false;
    }
    else {
      return true;
    }
  }
}
