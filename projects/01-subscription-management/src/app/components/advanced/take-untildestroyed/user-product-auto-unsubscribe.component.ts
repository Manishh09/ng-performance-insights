import { Component, DestroyRef, inject } from '@angular/core';
import { User } from '../../../models/user';
import { Product } from '../../../models/product';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-product-auto-unsubscribe',
  standalone: true,
  imports: [],
  templateUrl: './user-product-auto-unsubscribe.component.html',
  styleUrl: './user-product-auto-unsubscribe.component.scss'
})
export class UserProductAutoUnsubscribeComponent {
  protected users: User[] = [];
  protected products: Product[] = [];

  private readonly destroyRef = inject(DestroyRef);
  private readonly userService = inject(UserService);
  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    forkJoin({
      users: this.userService.getUsers(),
      products: this.productService.getProducts(),
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (result) => {
        this.users = result.users;
        this.products = result.products;
      },
      error: (error) => console.error('Error fetching users and products:', error),
      complete: () => console.log('Users and products loaded successfully')
    });
  }
}
