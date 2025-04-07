import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-form',
  imports: [FormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent {
  @Output() formSubmit = new EventEmitter<any>();

  ecuacion: string = '';
  condiciones: string = '';
  metodo: string = 'euler';

  submitForm() {
    this.formSubmit.emit({
      ecuacion: this.ecuacion,
      condiciones: this.condiciones,
      metodo: this.metodo
    });
  }
}
