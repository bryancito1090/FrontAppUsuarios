import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../Models/categoria.model';
import { CategoriaService } from '../../Services/categoria.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria();
  editMode: boolean = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  createCategoria(): void {
    this.categoriaService.createCategoria(this.categoria).subscribe(() => {
      this.getCategorias();
      this.categoria = new Categoria();
    });
  }

  editCategoria(categoria: Categoria): void {
    this.categoria = { ...categoria };
    this.editMode = true;
  }

  updateCategoria(): void {
    if (this.categoria.categoriaid !== undefined) {
      this.categoriaService.updateCategoria(this.categoria.categoriaid, this.categoria).subscribe(() => {
        this.getCategorias();
        this.categoria = new Categoria();
        this.editMode = false;
      });
    }
  }

  deleteCategoria(id: number): void {
    this.categoriaService.deleteCategoria(id).subscribe(() => {
      this.getCategorias();
    });
  }

  clearForm(): void {
    this.categoria = new Categoria();
    this.editMode = false;
  }
}