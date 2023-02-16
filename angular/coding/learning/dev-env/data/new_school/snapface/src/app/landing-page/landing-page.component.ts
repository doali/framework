import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private router: Router) {

  }

  onContinue() {
    this.router.navigateByUrl('facesnaps');
  }
}
