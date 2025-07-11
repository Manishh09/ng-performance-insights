import { Component, inject } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-profile-subsink',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-subsink.component.html',
  styleUrl: './user-profile-subsink.component.scss'
})
export class UserProfileSubsinkComponent {
  protected user?: User;
  protected pollingValue = 0;

  private readonly subs = new SubSink();
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(
      switchMap(params => this.userService.getUser(Number(params.get('id'))))
    ).subscribe({
      next: (user) => this.user = user,
      error: (error) => console.error('Error fetching user:', error),
      complete: () => console.log('User loaded successfully')
    });

    this.subs.add(
      this.userService.getPollingData().subscribe({
        next: (val) => this.pollingValue = val,
        error: (error) => console.error('Error in polling data:', error),
        complete: () => console.log('Polling completed')
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
