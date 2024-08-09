import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../Models/empleado.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../../Services/empleados.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadoForm: FormGroup;
  isEdit = false;
  selectedEmpleado?: Empleado;
  empleadosAll: any[] = [];
  mostrarTabla: boolean = false;
  constructor(
    private empleadoService: EmpleadoService,
    private empleadosService: EmpleadosService,
    private fb: FormBuilder
  ) {
    this.empleadoForm = this.fb.group({
      empleadoid: [''],
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
      fecha_registro: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe(data => {
      console.log("DATA ALL",data);
      
      this.empleadosAll = data;
      this.mostrarTabla = true;  
    });
  }

  loadEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.empleadoService.updateEmpleado(this.empleadoForm.value.empleadoid, this.empleadoForm.value).subscribe(() => {
        this.loadEmpleados();
        this.resetForm();
      });
    } else {
      this.empleadoService.createEmpleado(this.empleadoForm.value).subscribe(() => {
        this.loadEmpleados();
        this.resetForm();
      });
    }
  }

  editEmpleado(empleado: Empleado): void {
    this.isEdit = true;
    this.selectedEmpleado = empleado;
    this.empleadoForm.patchValue(empleado);
  }

  deleteEmpleado(id: number): void {
    this.empleadoService.deleteEmpleado(id).subscribe(() => {
      this.loadEmpleados();
    });
  }

  resetForm(): void {
    this.isEdit = false;
    this.selectedEmpleado = undefined;
    this.empleadoForm.reset();
  }
}