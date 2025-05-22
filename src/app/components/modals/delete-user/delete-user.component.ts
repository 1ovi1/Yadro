import {Component, inject} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import { finalize } from 'rxjs';

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
  private userService = inject(UserService)
  private message = inject(NzMessageService);
  private modalRef = inject(NzModalRef);
  public deleting: boolean = false;

  userId = (inject(NZ_MODAL_DATA) as { userId: number }).userId;

  deleteUser() {
    this.deleting = true;
    this.userService
      .deleteUser(this.userId)
      .pipe(finalize(() => (this.deleting = false)))
      .subscribe({
        next: () => {
          this.message.success(`Пользователь ${this.userId} удалён`);
          this.modalRef.destroy();
        },
        error: () => {
          this.message.error('Не удалось удалить пользователя');
          this.modalRef.destroy();
        }
      });
  }

  goBack() {
    this.modalRef.destroy();
  }
}
