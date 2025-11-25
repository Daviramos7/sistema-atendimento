import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // 🚨 IMPORTANTE: Se for rodar no celular ou em outro PC, troque 'localhost' pelo seu IP (ex: 192.168.0.X)
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // 1. Chama a rota para pegar o próximo da fila
  async chamarProximo(numeroGuiche: number) {
    // Envia { "guiche": 1 } para o backend
    return firstValueFrom(this.http.post<any>(`${this.API_URL}/chamar`, { guiche: numeroGuiche }));
  }

  // 2. Chama a rota para finalizar o atendimento atual
  async finalizarAtendimento(idAtendimento: number) {
    // Envia { "id_atendimento": 5 } para o backend
    return firstValueFrom(this.http.post<any>(`${this.API_URL}/finalizar`, { id_atendimento: idAtendimento }));
  }
}