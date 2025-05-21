import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'yadro-root',
  imports: [
    RouterOutlet,
    NzLayoutModule,
    NzModalModule,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Yadro"
}
