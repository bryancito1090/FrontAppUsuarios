import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/usuario.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../Services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  isEdit = false;
  selectedUsuario?: Usuario;
  usuariosAll: any[] = [];
  mostrarTabla = false;

  constructor(
    private usuarioService: UsuarioService,
    private usuariosService: UsuariosService,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      usuarioid: [''],
      nombre: ['', Validators.required],
      correoelectronico: ['', [Validators.required, Validators.email]],
      fecharegistro: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }
  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe((data: any[]) => {
      this.usuariosAll = data;
      this.mostrarTabla = true;
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
      this.usuarios = data;
    });
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.usuarioService.updateUsuario(this.usuarioForm.value.usuarioid, this.usuarioForm.value).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
      });
    } else {
      this.usuarioService.createUsuario(this.usuarioForm.value).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
      });
    }
  }

  editUsuario(usuario: Usuario): void {
    this.isEdit = true;
    this.selectedUsuario = usuario;
    this.usuarioForm.patchValue(usuario);
  }

  deleteUsuario(id: number | undefined): void {
    if (id !== undefined) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.loadUsuarios();
      });
    }
  }

  resetForm(): void {
    this.isEdit = false;
    this.selectedUsuario = undefined;
    this.usuarioForm.reset();
  }
}
