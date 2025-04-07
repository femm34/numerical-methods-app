import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NumericalMethodsService } from './services/numerical-methods.service';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputFormComponent, ResultadosComponent],
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
    if (metodo === 'euler') {
      this.resultados = this.numericalMethodsService.euler(ecuacion, y0, x0, xf, h);
    } else if (metodo === 'runge-kutta') {
      this.resultados = this.numericalMethodsService.rungeKutta(ecuacion, y0, x0, xf, h);
    } else if (metodo === 'newton-raphson') {
      this.resultados = this.numericalMethodsService.newtonRaphson(ecuacion, y0, x0, xf, h);
    }
  }

}
