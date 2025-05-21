import {Component, inject} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'yadro-delete-user',
  imports: [],
  templateUrl: './delete-user.component.html',
  standalone: true,
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  private router = inject(Router);
  private userService = inject(UserService)
  private message = inject(NzMessageService);
  private modalRef = inject(NzModalRef);

  userId = (inject(NZ_MODAL_DATA) as { userId: number }).userId;

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe({
      next: () => {
        this.message.success(`Пользователь ${this.userId} удалён`);
        this.modalRef.destroy();
      },
      error: (error) => {
        this.message.error('Не удалось удалить пользователя');
        this.modalRef.destroy();
      }
    });
  }

  goBack() {
    void this.router.navigate(['/']);
  }
}
