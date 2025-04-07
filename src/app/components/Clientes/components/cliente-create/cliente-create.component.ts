import { Component } from '@angular/core';
import { ClienteFormComponent } from "../cliente-form/cliente-form.component";

@Component({
  selector: 'app-cliente-create',
  imports: [ClienteFormComponent],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss'
})
export class ClienteCreateComponent {

}
