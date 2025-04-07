import { Component } from '@angular/core';
import { NumericalMethodsService } from './services/numerical-methods.service';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { CommonModule } from '@angular/common';
import { IsRaphsonStateService } from './services/is-raphson-state.service';

@Component({
  selector: 'app-root',
  imports: [InputFormComponent, ResultadosComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Resolución de Ecuaciones Diferenciales';

  ecuacion: string = '';
  condiciones: string = '';
  metodo: string = 'euler';
  resultados: any[] = [];

  isRaphson: boolean = false;


  constructor(private numericalMethodsService: NumericalMethodsService, private isRaphsonStateService: IsRaphsonStateService) {
  }

  onInit() {
    this.isRaphson = this.isRaphsonStateService.getIsRaphson();
  }


  resolver({ ecuacion, condiciones, metodo }: any) {
    let [y0, x0, xf, h] = condiciones.split(',').map(Number);

    this.resultados = [];

    if (metodo === 'euler') {
      this.isRaphson = false;
      this.isRaphsonStateService.setIsRaphson(false);
      let [x, y] = this.numericalMethodsService.eulerMethod(ecuacion, y0, x0, xf, h);
      this.resultados = this.formatearResultados(x, y);

    } else if (metodo === 'runge-kutta') {
      this.isRaphson = false;
      this.isRaphsonStateService.setIsRaphson(false);
      let [x, y] = this.numericalMethodsService.rungeKutta(ecuacion, y0, x0, xf, h);
      this.resultados = this.formatearResultados(x, y);
    } else if (metodo === 'newton-raphson') {
      this.isRaphsonStateService.setIsRaphson(true);
      this.isRaphson = true;
      let [x, y] = this.numericalMethodsService.newtonRaphson(ecuacion, x0);
      this.resultados = this.formatearResultados(x, y);
      this.isRaphson = this.isRaphsonStateService.getIsRaphson();
    }
  }


  formatearResultados(x: number[], y: number[]): any[] {
    return x.map((valorX, index) => {
      return { x: valorX, y: y[index] };
    });
  }
}
