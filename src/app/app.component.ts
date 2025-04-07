import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NumericalMethodsService } from './services/numerical-methods.service';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputFormComponent, ResultadosComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Resolución de Ecuaciones Diferenciales';

  ecuacion: string = '';
  condiciones: string = '';
  metodo: string = 'euler';
  resultados: any[] = [];

  constructor(private numericalMethodsService: NumericalMethodsService) { }

  resolver({ ecuacion, condiciones, metodo }: any) {
    let [y0, x0, xf, h] = condiciones.split(',').map(Number);

    this.resultados = [];

    if (metodo === 'euler') {
      let [x, y] = this.numericalMethodsService.eulerMethod(ecuacion, y0, x0, xf, h);
      this.resultados = this.formatearResultados(x, y);
    } else if (metodo === 'runge-kutta') {

      let [x, y] = this.numericalMethodsService.rungeKutta(ecuacion, y0, x0, xf, h);
      this.resultados = this.formatearResultados(x, y);
    } else if (metodo === 'newton-raphson') {
      let resultado = this.numericalMethodsService.newtonRaphson(ecuacion, x0);
      this.resultados.push({ x: resultado });
    }
  }

  // Formatear los resultados para mostrar en la UI
  formatearResultados(x: number[], y: number[]): any[] {
    return x.map((valorX, index) => {
      return { x: valorX, y: y[index] };
    });
  }
}
