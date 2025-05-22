import {Component, inject} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'yadro-delete-user',
  imports: [
    NzSpinComponent,
    NzButtonComponent,
  ],
  templateUrl: './delete-user.component.html',
  standalone: true,
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  private router = inject(Router);
  private userService = inject(UserService)
  private message = inject(NzMessageService);
  private modalRef = inject(NzModalRef);
  public deleting: boolean = false;

  userId = (inject(NZ_MODAL_DATA) as { userId: number }).userId;

  deleteUser() {
    this.deleting = true;
    this.userService.deleteUser(this.userId).subscribe({
      next: () => {
        this.deleting = false;
        this.message.success(`Пользователь ${this.userId} удалён`);
        this.modalRef.destroy();
      },
      error: () => {
        this.deleting = true;
        this.message.error('Не удалось удалить пользователя');
        this.modalRef.destroy();
      }
    });
  }

  goBack() {
    void this.router.navigate(['/']);
  }
}
