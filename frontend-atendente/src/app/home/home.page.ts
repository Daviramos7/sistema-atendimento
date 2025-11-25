import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  guiche: number | null = null;            // Armazena o número do guichê digitado
  senhaAtual: string | null = null;        // Armazena a senha que está sendo atendida (ex: 251125-SP3)
  idAtendimentoAtual: number | null = null; // ID para poder finalizar depois

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  // --- Função para CHAMAR ---
  async chamar() {
    if (!this.guiche) {
      this.mostrarAlerta('Atenção', 'Por favor, digite o número do seu guichê antes de chamar.');
      return;
    }

    try {
      const resposta = await this.api.chamarProximo(this.guiche);
      
      // Se der certo, guardamos os dados e a tela muda automaticamente
      this.senhaAtual = resposta.senha;
      this.idAtendimentoAtual = resposta.id_atendimento;
      
    } catch (error: any) {
      // Se o backend retornar erro 404, é porque a fila está vazia
      if (error.status === 404) {
        this.mostrarToast('Não há ninguém na fila agora.', 'warning');
      } else {
        console.error(error);
        this.mostrarAlerta('Erro', 'Falha ao conectar no servidor. O Backend está rodando?');
      }
    }
  }

  // --- Função para FINALIZAR ---
  async finalizar() {
    if (!this.idAtendimentoAtual) return;

    try {
      await this.api.finalizarAtendimento(this.idAtendimentoAtual);
      
      this.mostrarToast(`Atendimento da senha ${this.senhaAtual} finalizado com sucesso!`, 'success');
      
      // Limpa as variáveis para o atendente ficar "Livre" de novo
      this.senhaAtual = null;
      this.idAtendimentoAtual = null;

    } catch (error) {
      this.mostrarAlerta('Erro', 'Não foi possível finalizar o atendimento.');
    }
  }

  // --- Helpers Visuais ---
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ 
      message, 
      duration: 2000, 
      color, 
      position: 'top' // Aparece no topo da tela
    });
    await toast.present();
  }
}