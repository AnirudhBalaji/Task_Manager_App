import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard: Activating for route:', state.url);

  try {
    console.log('AuthGuard: Calling authService.checkAuthStatus()...');
    // Check authentication status. This will throw an error if not authenticated.
    await authService.checkAuthStatus();
    console.log('AuthGuard: authService.checkAuthStatus() SUCCEEDED. User is authenticated. Allowing access to:', state.url);

    // If authenticated, allow access to the route the user requested (e.g., /view-task, /create-task, /home).
    // The previous logic to force a redirect to /home if not already there is removed,
    // as it interfered with navigating to other protected pages.
    return true;

  } catch (error) {
    console.error('AuthGuard: authService.checkAuthStatus() FAILED.', error);
    console.warn('AuthGuard: User not authenticated or token invalid. Redirecting to login.', error);
    // If authentication fails, redirect to the login page.
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Prevent access to the route
  }
};
