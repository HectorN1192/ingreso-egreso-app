import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  crearUsuario() {
    if (this.registroForm.valid) {
      const { nombre, correo, password } = this.registroForm.value;

      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.authservice
        .crearUsuario(nombre, correo, password)
        .then((credenciales) => {
          console.log('respuesta', credenciales);
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        });
    }
  }
}
