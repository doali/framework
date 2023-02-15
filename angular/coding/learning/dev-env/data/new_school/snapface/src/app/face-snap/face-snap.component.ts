import { Component, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent {
  snapped!: boolean;
  buttonText!: string;
  // imageUrl!: string;
  @Input() faceSnap!: FaceSnap; // peut-être utilisé lors de l'attribute binding

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit() {
    this.snapped = false;
    this.buttonText = "Snap me !";
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
