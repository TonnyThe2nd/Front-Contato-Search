import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alterar-contato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Alterar Contato</h2>

    <div mat-dialog-content>

      <mat-form-field class="full-width">
        <mat-label>Nome</mat-label>
        <input matInput [(ngModel)]="nome">
      </mat-form-field>

      <mat-form-field class="full-width">
        <mat-label>Idade</mat-label>
        <input matInput type="number" [(ngModel)]="idade">
      </mat-form-field>

      <div *ngFor="let telefone of telefones; let i = index; trackBy: trackByIndex">

        <mat-form-field class="full-width">
          <mat-label>Telefone {{ i + 1 }}</mat-label>
          <input matInput [(ngModel)]="telefones[i]" name="telefone{{i}}">
        </mat-form-field>

        <button mat-button color="warn" *ngIf="telefones.length > 1"
                (click)="removerTelefone(i)">
          Remover
        </button>

      </div>

      <button mat-stroked-button color="primary" (click)="adicionarTelefone()">
        Adicionar outro número
      </button>

    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="fechar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="salvar()">Salvar</button>
    </div>
  `
})
export class AlterarContatoComponent {

  nome = '';
  idade = 0;
  telefones: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<AlterarContatoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    if (data) {
      this.nome = data.nome;
      this.idade = data.idade;


      this.telefones = data.telefone?.length
        ? [...data.telefone]
        : [''];
    }
  }

  adicionarTelefone() {
    this.telefones.push('');
  }

  removerTelefone(index: number) {
    this.telefones.splice(index, 1);
  }

  salvar() {
    this.dialogRef.close({
      id: this.data.id, 
      nome: this.nome,
      idade: this.idade,
      telefone: this.telefones.filter(t => t.trim() !== '')
    });
  }

  fechar() {
    this.dialogRef.close();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
