import { RouterOutlet,Router} from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-login',
  imports: [],
  templateUrl: './default-login.component.html',
  styleUrl: './default-login.component.scss'
})
export class DefaultLoginComponent {
@Input() title = '';
@Input() primaryButtonText = '';
@Input() secondaryButtonText = '';
@Input() disablePrimaryButton: boolean = true;
@Output("submit") envio = new EventEmitter();
@Output("navegate") OnNavegate = new EventEmitter();

constructor(private router:Router){}

submit(){
  this.envio.emit();
}

navegate(){
this.OnNavegate.emit();
}

}
