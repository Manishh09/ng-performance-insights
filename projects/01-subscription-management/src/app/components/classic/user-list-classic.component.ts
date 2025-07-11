import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list-classic',
  standalone: true,
  imports: [],
  templateUrl: './user-list-classic.component.html',
  styleUrl: './user-list-classic.component.scss'
})
export class UserListClassicComponent {
  protected users: User[] = [];
  protected pollingValue = 0;

  private readonly userService = inject(UserService);
  private readonly subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.getUsers().subscribe({
        next: (users) => this.users = users,
        error: (error) => console.error('Error fetching users:', error),
        complete: () => console.log('Users loaded successfully')
      })
    );
    this.subscriptions.add(
      this.userService.getPollingData().subscribe({
        next: (val) => this.pollingValue = val,
        error: (error) => console.error('Error in polling data:', error),
        complete: () => console.log('Polling completed')
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
