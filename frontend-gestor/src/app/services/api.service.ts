import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Troque localhost pelo IP se for rodar no celular do chefe
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // 1. Pega os números gerais (Totais e Tempo Médio)
  async getEstatisticas() {
    return firstValueFrom(this.http.get<any>(`${this.API_URL}/relatorios/stats`));
  }

  // 2. Pega a lista completa (Tabela de Auditoria)
  async getRelatorioDetalhado() {
    return firstValueFrom(this.http.get<any[]>(`${this.API_URL}/relatorios/detalhado`));
  }
}