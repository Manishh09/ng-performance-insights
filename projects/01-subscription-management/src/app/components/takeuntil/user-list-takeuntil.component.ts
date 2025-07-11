import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list-takeuntil',
  standalone: true,
  imports: [],
  templateUrl: './user-list-takeuntil.component.html',
  styleUrl: './user-list-takeuntil.component.scss'
})
export class UserListTakeuntilComponent {
  protected users: User[] = [];
  protected pollingValue = 0;

  private readonly destroy$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => this.users = users,
        error: (error) => console.error('Error fetching users:', error),
        complete: () => console.log('Users loaded successfully')
      });

    this.userService.getPollingData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (val) => this.pollingValue = val,
        error: (error) => console.error('Error in polling data:', error),
        complete: () => console.log('Polling completed')
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
