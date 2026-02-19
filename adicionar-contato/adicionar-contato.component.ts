import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-adicionar-contato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
     MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Novo Contato</h2>

    <div mat-dialog-content>
      <mat-form-field class="full-width">
      <mat-label>Nome</mat-label>
      <input matInput [(ngModel)]="nome">
    </mat-form-field>

    <mat-form-field class="full-width">
      <mat-label>Idade</mat-label>
      <input matInput type="number" [(ngModel)]="idade">
    </mat-form-field>

    <div *ngFor="let telefone of telefones; let i = index; trackBy: trackByIndex" class="telefone-row">

      <mat-form-field class="full-width">
        <mat-label>Telefone {{i + 1}}</mat-label>
        <input matInput [(ngModel)]="telefones[i]" name="telefone{{i}}">
      </mat-form-field>

      <button mat-icon-button color="warn" *ngIf="telefones.length > 1"
              (click)="removerTelefone(i)">
        <mat-icon>remove</mat-icon>
      </button>

    </div>

    <button mat-stroked-button color="primary" (click)="adicionarTelefone()">
      <mat-icon>add</mat-icon>
      Adicionar outro número
    </button>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="fechar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="salvar()">Salvar</button>
    </div>
  `
})
export class AdicionarContatoComponent {

  nome = '';
  idade = 0;

  telefones: string[] = ['']; 

  constructor(private dialogRef: MatDialogRef<AdicionarContatoComponent>) {}

  adicionarTelefone() {
    this.telefones.push('');
  }

  removerTelefone(index: number) {
    this.telefones.splice(index, 1);
  }

  salvar() {
    this.dialogRef.close({
      nome: this.nome,
      idade: this.idade,
      telefone: this.telefones.filter(t => t.trim() !== '')
    });
  }

  fechar() {
    this.dialogRef.close();
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
