import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private guestTokenKey = 'guest-token'; 

  constructor() {}

  getGuestToken(): string | null {
    return localStorage.getItem(this.guestTokenKey);
  }

  generateGuestToken(): string {
    const guestToken = 'guest-' + new Date().getTime();  
    localStorage.setItem(this.guestTokenKey, guestToken);  
    return guestToken;
  }

  
  isGuestTokenValid(): boolean {
    const token = this.getGuestToken();
    return token !== null && token.startsWith('guest-');  
  }

 
  clearGuestToken(): void {
    localStorage.removeItem(this.guestTokenKey);
  }
}
