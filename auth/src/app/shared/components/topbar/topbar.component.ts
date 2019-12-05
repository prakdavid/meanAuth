import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtToken } from '../../models/jwt-token.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {
  public jtToken: JwtToken;
  public subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.jwtToken.subscribe( (jwtToken: JwtToken) => {
      this.jtToken = jwtToken;
    } );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  public logout(): void {
    this.authService.logout();
  }
}
