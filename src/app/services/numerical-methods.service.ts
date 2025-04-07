import { Injectable } from '@angular/core';
import * as math from 'mathjs';


@Injectable({
  providedIn: 'root'
})

export class NumericalMethodsService {
  newtonRaphson(f: string, x0: number, tol: number = 1e-6, maxIter: number = 100): number {
    let x = x0;

    const compiledFunc = math.compile(f);

    for (let i = 0; i < maxIter; i++) {
      let fx = compiledFunc.evaluate({ x: x });

      let h = 1e-6;
      let dfx = (compiledFunc.evaluate({ x: x + h }) - fx) / h;

      if (Math.abs(dfx) < tol) {
        throw new Error("La derivada es cero. No se puede aplicar el método de Newton-Raphson.");
      }

      let xNew = x - fx / dfx;
      console.log(`Iteración ${i + 1}: x = ${xNew}`);

      if (Math.abs(xNew - x) < tol) {
        return xNew;
      }

      x = xNew;
    }
    throw new Error("No se encontró una solución en el número máximo de iteraciones.");
  }

  rungeKutta(f: string, y0: number, x0: number, xf: number, h: number): [number[], number[]] {
    let nSteps = this.calculateSteps(xf, x0, h);

    let x: number[] = Array(nSteps + 1).fill(0);
    let y: number[] = Array(nSteps + 1).fill(0);

    const compiledFunc = math.compile(f);

    x[0] = x0;
    y[0] = y0;

    for (let i = 0; i < nSteps; i++) {
      let k1 = h * compiledFunc.evaluate({ x: x[i], y: y[i] });
      let k2 = h * compiledFunc.evaluate({ x: x[i] + h / 2, y: y[i] + k1 / 2 });
      let k3 = h * compiledFunc.evaluate({ x: x[i] + h / 2, y: y[i] + k2 / 2 });
      let k4 = h * compiledFunc.evaluate({ x: x[i] + h, y: y[i] + k3 });

      x[i + 1] = x[i] + h;
      y[i + 1] = y[i] + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    }

    return [x, y];
  }

  eulerMethod(f: string, y0: number, x0: number, xf: number, h: number): [number[], number[]] {
    let nSteps = this.calculateSteps(xf, x0, h);

    console.log("nSteps", nSteps, "h", h, "xf", xf, "x0", x0, "y0", y0);

    let x: number[] = Array(nSteps + 1).fill(0);
    let y: number[] = Array(nSteps + 1).fill(0);

    const compiledFunc = math.compile(f);

    x[0] = x0;
    y[0] = y0;

    try {
      for (let i = 0; i < nSteps; i++) {
        let fValue = compiledFunc.evaluate({ x: x[i], y: y[i] });
        if (!isFinite(fValue)) {
          console.error(`Valor no finito detectado en iteración ${i}: ${fValue}`);
          throw new Error(`La evaluación dio un resultado no válido (${fValue}) en x=${x[i]}, y=${y[i]}`);
        }

        console.log(`Iteración ${i + 1}: x = ${x[i]}, y = ${y[i]}, f(x,y) = ${fValue}`);

        x[i + 1] = x[i] + h;
        y[i + 1] = y[i] + h * fValue;
      }
    } catch (error) {
      console.error("Error durante la ejecución del método de Euler:", error);
      return [x.slice(0, x.findIndex(val => !isFinite(val)) || x.length),
      y.slice(0, y.findIndex(val => !isFinite(val)) || y.length)];
    }

    return [x, y];
  }

  calculateSteps(xf: number, x0: number, h: number): number {
    return Math.floor((xf - x0) / h);
  }
}