import { Component, inject } from '@angular/core';
import { User } from '../../../models/user';
import { Product } from '../../../models/product';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-product-takeuntil',
  standalone: true,
  imports: [],
  templateUrl: './user-product-takeuntil.component.html',
  styleUrl: './user-product-takeuntil.component.scss'
})
export class UserProductTakeUntilComponent {
  protected users: User[] = [];
  protected products: Product[] = [];

  private readonly destroy$ = new Subject<void>();
  private readonly userService = inject(UserService);
  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    forkJoin({
      users: this.userService.getUsers(),
      products: this.productService.getProducts(),
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (result) => {
        this.users = result.users;
        this.products = result.products;
      },
      error: (error) => console.error('Error fetching users and products:', error),
      complete: () => console.log('Users and products loaded successfully')
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
