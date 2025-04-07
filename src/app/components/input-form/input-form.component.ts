import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IsRaphsonStateService } from '../../services/is-raphson-state.service';


@Component({
  selector: 'app-input-form',
  imports: [FormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent {
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private isRaphsonStateService: IsRaphsonStateService) { }

  ecuacion: string = '';
  condiciones: string = '';
  metodo: string = 'euler';

  submitForm() {
    this.isRaphsonStateService.setIsRaphson(false);
    this.formSubmit.emit({
      ecuacion: this.ecuacion,
      condiciones: this.condiciones,
      metodo: this.metodo
    });
  }
}
