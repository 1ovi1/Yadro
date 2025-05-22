import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzIconModule} from 'ng-zorro-antd/icon';

@Component({
  selector: 'yadro-info',
  imports: [
    NzSpinComponent,
    NzIconModule
  ],
  templateUrl: './info.component.html',
  standalone: true,
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  user = signal<User | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      if (userId) {
        this.userService.getUser(userId).subscribe(
          user => this.user.set(user)
        );
      }
    });
  }

  goBack() {
    void this.router.navigate(['/']);
  }
}
