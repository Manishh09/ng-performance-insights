import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  protected isMobileMenuOpen = false;
  
  protected readonly navigationItems = [
    {
      path: '/classic',
      label: 'Classic Pattern',
      description: 'Manual subscription management'
    },
    {
      path: '/takeuntil',
      label: 'TakeUntil Pattern',
      description: 'Using takeUntil operator'
    },
    {
      path: '/auto-unsubscribe',
      label: 'Auto Unsubscribe',
      description: 'Using takeUntilDestroyed'
    },
    {
      path: '/subsink',
      label: 'SubSink Pattern',
      description: 'Using SubSink library'
    }
  ];

  protected readonly advancedItems = [
    {
      path: '/advanced/takeuntil',
      label: 'Advanced TakeUntil',
      description: 'Multiple observables with takeUntil'
    },
    {
      path: '/advanced/auto-unsubscribe',
      label: 'Advanced Auto Unsubscribe',
      description: 'Multiple observables with takeUntilDestroyed'
    }
  ];
  
  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  protected closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
