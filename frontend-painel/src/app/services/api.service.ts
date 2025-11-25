import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Lembre-se: troque localhost pelo IP do seu PC se for ligar numa TV Smart de verdade
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Busca a lista das últimas 5 senhas chamadas
  async getPainel() {
    return firstValueFrom(this.http.get<any[]>(`${this.API_URL}/painel`));
  }
}