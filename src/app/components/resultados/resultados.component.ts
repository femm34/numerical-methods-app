import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IsRaphsonStateService } from '../../services/is-raphson-state.service';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {
  @Input() resultados: any[] = [];
  @Input() isRaphson: boolean = false;

  constructor(private isRaphsonService: IsRaphsonStateService) { }

  onInit() {
    console.log(this.resultados);
    console.log(this.isRaphson);
    this.isRaphson = this.isRaphsonService.getIsRaphson();
  }
}
