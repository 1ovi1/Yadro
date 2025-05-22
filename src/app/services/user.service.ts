import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient)

  //сразу сделал пагинацию
  getUsersWithPagination(page: number, pageSize: number): Observable<PaginatedResponse> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const totalItems = users.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

        return {
          users: paginatedUsers,
          totalPages,
          totalItems,
          currentPage: page
        };
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<NonNullable<unknown>> {
    return this.http.delete<NonNullable<unknown>>(`${this.apiUrl}/${id}`);
  }
}

interface PaginatedResponse {
  users: User[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
