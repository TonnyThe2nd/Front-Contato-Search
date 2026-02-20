import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ContatoService } from '../services/contato.service';
import { ContatoModel } from './entidades/contato';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdicionarContatoComponent } from '../adicionar-contato/adicionar-contato.component';
import { AlterarContatoComponent } from '../alterar-contato/alterar-contato.component';


@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatCardModule, FormsModule, CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent{

  constructor(private contatoService : ContatoService, private dialog : MatDialog) { }
  nome: string = '';
  numero: string = '';
  contatos : ContatoModel[] = []


  ngOnInit(){
    this.buscarTodosContato()
  }
  buscarTodosContato(){
    this.contatoService.BuscarTodosContato().subscribe(
      (res)=>{
        this.contatos = res},
      (err)=>{
        console.log(err)
      }
    )
  }
  buscarContato(nome: string) {
    this.contatoService.BuscarContatoNome(nome).subscribe(
      (res)=>{
        this.contatos = res
      },
      (err)=>{
        this.openMessageBox(4)
        console.log(err)
      }
    )
  }

  editarContato(contato: ContatoModel) {
    this.contatoService.BuscarContatoPorId(contato.id).subscribe(res => {

      const dialogRef = this.dialog.open(AlterarContatoComponent, {
        width: '500px',
        data: res 
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.contatoService.AlterarContato(result).subscribe(updated => {
            this.openMessageBox(2)
            const index = this.contatos.findIndex(c => c.id === updated.id);
            if (index > -1) this.contatos[index] = updated;

            this.contatos = [...this.contatos];
          });
        }
      });

    });
  }


  abrirDialogAdicionar() {
    const dialogRef = this.dialog.open(AdicionarContatoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contatoService.AdicionarContato(result).subscribe(
          (res) => {
            this.openMessageBox(1)
            this.contatos.push(res); 
            this.contatos = [...this.contatos]; 
          },
          (err) => console.log(err)
        );
      }
    });
  }

  deletarContato(id: number){
    this.contatoService.DeletarContato(id).subscribe(
      (res)=>{
        this.openMessageBox(3)
        this.contatos = this.contatos.filter(contato => contato.id !== id);
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  buscarPorNumero(numero: string){
    this.contatoService.BuscarPorNumero(numero).subscribe(
      (res) =>{
        this.contatos = res;
      },(err)=>{
        this.openMessageBox(4)
      }
    )
  }

  openMessageBox(sit : number){
    switch(sit){
      case 1:
        alert(`Contato adicionado com sucesso!`)
        break;
      case 2:
        alert(`Contato alterado com sucesso!`)
        break;
      case 3:
        alert(`Contato excluido com sucesso!`)
        break;
      case 4:
        alert(`Contato não encontrado!`)
        break;
    }
  }
}
