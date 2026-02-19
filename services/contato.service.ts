import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  constructor(private http : HttpClient) {}
  url : string = 'https://localhost:7065/api/contato'

  BuscarContatoNome(nome: string): Observable<any>{
    return this.http.get(`${this.url}/nome/${nome}`)
  }
  BuscarTodosContato():Observable<any>{
    return this.http.get(`${this.url}`)
  }
  AdicionarContato(contato: any): Observable<any>{
    return this.http.post(`${this.url}`, contato)
  }

  DeletarContato(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }
  AlterarContato(contato: any): Observable<any>{
    return this.http.put(`${this.url}/${contato.id}`, contato)
  }
  BuscarContatoPorId(id: number): Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }
}
