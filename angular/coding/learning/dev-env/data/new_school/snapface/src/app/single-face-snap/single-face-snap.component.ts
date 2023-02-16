import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent {
  snapped!: boolean;
  buttonText!: string;
  // imageUrl!: string;
  faceSnap!: FaceSnap; // peut-être utilisé lors de l'attribute binding

  constructor(private faceSnapsService: FaceSnapsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.snapped = false;
    this.buttonText = "Snap me !";
    const snapId: number = +this.activatedRoute.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(snapId);
  }

  onBack() {
    this.router.navigateByUrl("/facesnaps");
  }

  onSnap() {
    if (this.snapped == false) {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.snapped = true;
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
      this.snapped = false;
    }
    this.updateButtonText();
  }

  updateButtonText() {
    this.buttonText = (this.snapped) ? "Snapped :-)" : "Snap me !!";
  }
}
