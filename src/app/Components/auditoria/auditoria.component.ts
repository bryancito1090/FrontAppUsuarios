import { Component, OnInit } from '@angular/core';
import { Auditoria } from '../../Models/auditoria.model';
import { AuditoriaService } from '../../Services/auditoria.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export class AuditoriaComponent implements OnInit {

  auditorias: Auditoria[] = [];

  constructor(private auditoriaService: AuditoriaService) { }

  ngOnInit(): void {
    this.auditoriaService.getAuditorias().subscribe(data => {
      this.auditorias = data;
      console.log(data);
      
    });
  }
}