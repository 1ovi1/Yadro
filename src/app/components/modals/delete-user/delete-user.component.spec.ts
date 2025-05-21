// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DeleteUserComponent } from './delete-user.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
// import { UserService } from '../../../services/user.service';
// import { of } from 'rxjs';
//
// describe('DeleteUserComponent', () => {
//   let component: DeleteUserComponent;
//   let fixture: ComponentFixture<DeleteUserComponent>;
//   let userServiceSpy: jasmine.SpyObj<UserService>;
//
//   beforeEach(async () => {
//     const spy = jasmine.createSpyObj('UserService', ['deleteUser']);
//     spy.deleteUser.and.returnValue(of({}));
//
//     await TestBed.configureTestingModule({
//       imports: [
//         DeleteUserComponent,
//         HttpClientTestingModule
//       ],
//       providers: [
//         { provide: UserService, useValue: spy },
//         { provide: NZ_MODAL_DATA, useValue: { userId: 1 } }
//       ]
//     })
//       .compileComponents();
//
//     fixture = TestBed.createComponent(DeleteUserComponent);
//     component = fixture.componentInstance;
//     userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
