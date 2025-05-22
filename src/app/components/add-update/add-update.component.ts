import {Component, OnInit, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {User} from '../../interfaces/user';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'yadro-add-update',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSpinModule
  ],
  templateUrl: './add-update.component.html',
  standalone: true,
  styleUrl: './add-update.component.scss'
})
export class AddUpdateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private message = inject(NzMessageService);

  isEditMode = signal<boolean>(false);
  userId = signal<number | null>(null);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);

  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9_\-.]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9()\-\s.]+(\s*x\s*[0-9]+)?$/)
    ]),
    website: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      suite: new FormControl(''),
      city: new FormControl(''),
      zipcode: new FormControl(''),
      geo: new FormGroup({
        lat: new FormControl(''),
        lng: new FormControl('')
      })
    }),
    company: new FormGroup({
      name: new FormControl(''),
      catchPhrase: new FormControl(''),
      bs: new FormControl('')
    })
  });

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode.set(true);
      this.userId.set(Number(userId));
      this.loadUserData(Number(userId));
    }
  }

  private loadUserData(userId: number) {
    this.loading.set(true);
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          address: user.address,
          company: user.company
        });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Ошибка при загрузке данных пользователя:', err);
        this.loading.set(false);
        void this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.submitting.set(true);

    if (this.isEditMode()) {
      const id = this.userId();
      if (id === null) {
        this.submitting.set(false);
        return;
      }

      const userData: Partial<User> = this.userForm.value as Partial<User>;

      this.userService.updateUser(id, userData).subscribe({
        next: () => {
          this.submitting.set(false);
          this.message.success('Данные пользователя обновлены')
          void this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Ошибка при обновлении пользователя:', err);
          this.submitting.set(false);
        }
      });
    } else {
      const newUser: Omit<User, 'id'> = this.userForm.value as Omit<User, 'id'>;

      this.userService.createUser(newUser).subscribe({
        next: () => {
          this.submitting.set(false);
          this.message.success(`Пользователь ${newUser.name} создан`)
          void this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Ошибка при создании пользователя:', err);
          this.submitting.set(false);
        }
      });
    }
  }

  cancelEdit(){
    void this.router.navigate(['/']);
  }
}
