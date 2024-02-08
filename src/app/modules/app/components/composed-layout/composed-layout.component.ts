import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/modules/auth/services/keycloak/keycloak.service';

@Component({
  selector: 'app-composed-layout',
  templateUrl: './composed-layout.component.html',
  styleUrls: ['./composed-layout.component.sass'],
})
export class ComposedLayoutComponent implements OnInit {
  constructor(
    private readonly router: Router,
    public readonly keycloakService: KeycloakService
  ) {}

  async ngOnInit() {
    await this.keycloakService.configureSingleSingOn();
    const token = this.keycloakService.token;

    if (!token) {
      this.router.navigate(['/auth']);
      return;
    }
  }
}
