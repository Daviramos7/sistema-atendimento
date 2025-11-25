import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  senhaPrincipal: any = null; // A última senha (destaque gigante)
  historico: any[] = [];      // As outras anteriores (lista lateral)
  
  intervalo: any; // Controle do timer

  constructor(private api: ApiService) {}

  ngOnInit() {
    // 1. Carrega imediatamente ao abrir
    this.atualizarPainel();

    // 2. Configura para atualizar a cada 5 segundos (5000 ms)
    this.intervalo = setInterval(() => {
      this.atualizarPainel();
    }, 5000);
  }

  ngOnDestroy() {
    // Para o timer se fechar a página (evita erros de memória)
    if (this.intervalo) clearInterval(this.intervalo);
  }

  async atualizarPainel() {
    try {
      const lista = await this.api.getPainel();

      if (lista && lista.length > 0) {
        // A primeira da lista (índice 0) é a mais recente -> Destaque
        this.senhaPrincipal = lista[0];
        
        // As outras (do índice 1 em diante) vão para o histórico
        this.historico = lista.slice(1);
      }
    } catch (error) {
      console.error('Erro ao atualizar painel. O Backend está rodando?', error);
    }
  }
}