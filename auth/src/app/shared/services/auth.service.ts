import { Injectable, ɵConsole } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, timer, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtToken } from '../models/jwt-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });

  public subscription: Subscription;

  constructor(
    private http: HttpClient
  ) {
    this.initToken();
    // this.subscription = this.initTimer();
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null 
      });
    }
  }

  public initTimer() {
    return timer(2000, 5000).pipe(
      switchMap(() => {
        if (localStorage.getItem('jwt')) {
          return this.http.get<string>('/api/auth/refresh-token').pipe(
            tap((token: string) => {
              console.log('01 in initTimer');
              this.jwtToken.next({
                isAuthenticated: true,
                token: token
              });
              localStorage.setItem('jwt', token);
            })
          );
        } else {
          console.log('no token to refresh');
          this.subscription.unsubscribe();
          return of(null);
        }
      })
    ).subscribe(() => {}, err => {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
      localStorage.removeItem('jwt');
      this.subscription.unsubscribe();
    });
    console.log(this.jwtToken.value);
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credential: { email: string, password: string }): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credential).pipe(
      tap( (token: string) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: token
        });

        localStorage.setItem('jwt', token);
      }),
    );
  }

  public logout(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('jwt');
  }
}
