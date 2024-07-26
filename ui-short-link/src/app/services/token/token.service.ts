import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper = new JwtHelperService();
  private _currentUser: any = null;

  constructor() {
    const token = this.token;
    if (token) {
      this.currentUser = token;
    }
  }

  set token(value: string | null) {
    if (typeof localStorage !== 'undefined') {
      if (value) {
        localStorage.setItem('token', value);
        this.currentUser = value;
      } else {
        localStorage.removeItem('token');
        this.clearCurrentUser();
      }
    }
  }

  get token(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  set currentUser(token: string | null) {
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken) {
        this._currentUser = {
          username: decodedToken.username || '',
          role: decodedToken.authorities ? decodedToken.authorities[0] : ''
        };
        localStorage.setItem('currentUser', JSON.stringify(this._currentUser));
      }
    } else {
      this._currentUser = null;
      localStorage.removeItem('currentUser');
    }
  }

  get currentUser(): any {
    if (!this._currentUser && typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      try {
        this._currentUser = user ? JSON.parse(user) : null;
      } catch (e) {
        this._currentUser = null;
      }
    }
    return this._currentUser;
  }

  clearCurrentUser() {
    this._currentUser = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  clearToken() {
    this.token = null;
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // check expiry date
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities;
    }
    return [];
  }
}
