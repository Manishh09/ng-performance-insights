import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private cachedUsers: User[] = [];

  private readonly httpClient = inject(HttpClient);


  getUsers(): Observable<User[]> {
    console.log('UserService: Fetching users...');
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User | undefined> {
    if (this.cachedUsers.length === 0) {
      this.getUsers().subscribe({
        next: (users) => this.cachedUsers = users,
        error: (error) => console.error('Error fetching users for cache:', error),
        complete: () => console.log('Users cached successfully')
      });
    }
    return of(this.cachedUsers.find(u => u.id === id)).pipe(delay(300));
  }

  getPollingData(): Observable<number> {
    console.log('UserService: Starting polling stream...');
    return timer(0, 1000); // emits every second
  }
}