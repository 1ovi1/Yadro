import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';

@Component({
  selector: 'yadro-info',
  imports: [],
  templateUrl: './info.component.html',
  standalone: true,
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{
  private route = inject(ActivatedRoute);
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
}
