import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumericalMethodsService {

  constructor() { }

  euler(ecuacion: string, y0: number, x0: number, xf: number, h: number) {
    let resultados = [];
    let y = y0;
    let x = x0;
    while (x <= xf) {
      resultados.push({ x: x, y: y });
      y = y + h * this.evaluateEquation(ecuacion, x, y);
      x = x + h;
    }
    return resultados;
  }

  rungeKutta(ecuacion: string, y0: number, x0: number, xf: number, h: number) {
    let resultados = [];
    let y = y0;
    let x = x0;
    while (x <= xf) {
      resultados.push({ x: x, y: y });
      let k1 = h * this.evaluateEquation(ecuacion, x, y);
      let k2 = h * this.evaluateEquation(ecuacion, x + h / 2, y + k1 / 2);
      let k3 = h * this.evaluateEquation(ecuacion, x + h / 2, y + k2 / 2);
      let k4 = h * this.evaluateEquation(ecuacion, x + h, y + k3);
      y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      x = x + h;
    }
    return resultados;
  }

  // Método de Newton-Raphson
  newtonRaphson(ecuacion: string, y0: number, x0: number, xf: number, h: number) {
    let resultados = [];
    let x = x0;
    while (x <= xf) {
      let f = this.evaluateEquation(ecuacion, x, y0);
      let df = this.evaluateEquation(ecuacion, x + h, y0); // Aproximación para la derivada
      let y = y0 - f / df;
      resultados.push({ x: x, y: y });
      x = x + h;
    }
    return resultados;
  }

  evaluateEquation(ecuacion: string, x: number, y: number): number {
    const eq = ecuacion.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan').replace(/x/g, `(${x})`)
      .replace(/y/g, `(${y})`);
    try {
      return eval(eq);
    } catch (e) {
      console.error('Error al evaluar la ecuación: ', e);
      return 0;
    }
  }
}
