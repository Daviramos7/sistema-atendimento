import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  // Variáveis para guardar os dados do Backend
  producao: any[] = [];
  performance: any[] = [];
  detalhado: any[] = [];

  constructor(private api: ApiService) {}

  // Carrega os dados toda vez que entra na tela
  ionViewWillEnter() {
    this.carregarDados(null);
  }

  async carregarDados(event: any) {
    try {
      // 1. Busca Estatísticas (Cards)
      const stats = await this.api.getEstatisticas();
      this.producao = stats.producao || [];
      this.performance = stats.performance || [];

      // 2. Busca Detalhado (Tabela)
      this.detalhado = await this.api.getRelatorioDetalhado();

    } catch (error) {
      console.error('Erro ao carregar dashboard', error);
    } finally {
      // Se foi chamado pelo "puxar para atualizar", encerra a animação
      if (event) event.target.complete();
    }
  }

  // Auxiliar para formatar o tempo (que vem do banco como string ou número)
  formatarTempo(valor: any) {
    if (!valor) return '0 min';
    // Arredonda para 1 casa decimal
    return parseFloat(valor).toFixed(1) + ' min';
  }
}