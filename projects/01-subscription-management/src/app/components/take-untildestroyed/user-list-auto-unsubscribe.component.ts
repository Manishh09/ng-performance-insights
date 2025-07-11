import { Component, DestroyRef, inject } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list-auto-unsubscribe',
  standalone: true,
  imports: [],
  templateUrl: './user-list-auto-unsubscribe.component.html',
  styleUrl: './user-list-auto-unsubscribe.component.scss'
})
export class UserListAutoUnsubscribeComponent {
  protected users: User[] = [];
  protected pollingValue = 0;

  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => this.users = users,
        error: (error) => console.error('Error fetching users:', error),
        complete: () => console.log('Users loaded successfully')
      });

    this.userService.getPollingData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (val) => this.pollingValue = val,
        error: (error) => console.error('Error in polling data:', error),
        complete: () => console.log('Polling completed')
      });
  }
}
