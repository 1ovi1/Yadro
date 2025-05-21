import {Component, inject, OnInit, signal} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {DeleteUserComponent} from '../modals/delete-user/delete-user.component';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'yadro-main',
  imports: [
    RouterLink,
    CommonModule,
    NzPaginationModule,
    NzModalModule,
    NzHeaderComponent,
    NzButtonComponent
  ],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private userService = inject(UserService);
  private modal = inject(NzModalService);

  public users = signal<User[]>([]);
  public currentPage = signal<number>(1);
  public totalPages = signal<number>(1);
  public totalItems = signal<number>(0);
  public pageSize = signal<number>(4);
  public loading = signal<boolean>(false);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.userService.getUsersWithPagination(this.currentPage(), this.pageSize())
      .subscribe({
        next: (response) => {
          this.users.set(response.users);
          this.totalPages.set(response.totalPages);
          this.totalItems.set(response.totalItems);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadUsers();
  }

  invokeDeleteModal(userId: number) {
    this.modal.create({
      nzContent: DeleteUserComponent,
      nzTitle: undefined,
      nzFooter: null,
      nzWidth: 408,
      nzData: {
        userId,
      },
    });
  }
}
