import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../../Models/prestamo.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrestamoService } from '../../Services/prestamo.service';
import { CommonModule } from '@angular/common';
import { PrestamosService } from '../../Services/prestamos.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent implements OnInit {
  prestamos: Prestamo[] = [];
  prestamoForm: FormGroup;
  isEdit = false;
  selectedPrestamo?: Prestamo;
  prestamosAll: any[] = [];
  mostrar: boolean = false;

  constructor(
    private prestamoService: PrestamoService,
    private prestamosService: PrestamosService,
    private fb: FormBuilder
  ) {
    this.prestamoForm = this.fb.group({
      prestamoid: [''],
      libroid: ['', Validators.required],
      usuarioid: ['', Validators.required],
      fechaprestamo: ['', Validators.required],
      fechadevolucion: ['', Validators.required],
      empleadoid: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  mostrarTabla(): void {
    this.prestamosService.getPrestamos().subscribe(data => {
      this.prestamosAll = data;
      this.mostrar = true;
    });
  }

  ngOnInit(): void {
    this.loadPrestamos();
  }

  loadPrestamos(): void {
    this.prestamoService.getPrestamos().subscribe(data => {
      this.prestamos = data;
    });
  }

  onSubmit(): void {
    if (this.isEdit && this.selectedPrestamo?.prestamoid) {
      this.prestamoService.updatePrestamo(this.selectedPrestamo.prestamoid, this.prestamoForm.value).subscribe(() => {
        this.loadPrestamos();
        this.resetForm();
      });
    } else {
      this.prestamoService.createPrestamo(this.prestamoForm.value).subscribe(() => {
        this.loadPrestamos();
        this.resetForm();
      });
    }
  }

  editPrestamo(prestamo: Prestamo): void {
    this.isEdit = true;
    this.selectedPrestamo = prestamo;
    this.prestamoForm.patchValue(prestamo);
  }

  deletePrestamo(id: number): void {
    this.prestamoService.deletePrestamo(id).subscribe(() => {
      this.loadPrestamos();
    });
  }

  resetForm(): void {
    this.isEdit = false;
    this.selectedPrestamo = undefined;
    this.prestamoForm.reset();
  }
}