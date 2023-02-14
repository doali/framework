import { Component, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent {
  snapped!: boolean;
  buttonText!: string;
  // imageUrl!: string;
  @Input() faceSnap!: FaceSnap;

  ngOnInit() {
    this.snapped = false;
    this.buttonText = "Snap me !";
    // this.imageUrl = "./assets/img/ginkgo_1.png";
    // this.imageUrl = "https://images.vexels.com/media/users/3/316639/isolated/lists/e096aaed41b1fa15921450147f547b63-ginkgo-biloba-flat-leaves.png";
  }

  onSnap() {
    if (this.snapped == false) {
      this.faceSnap.snaps++;
      this.snapped = true;      
    } else {
      this.faceSnap.snaps--;
      this.snapped = false;
    }
    this.updateButtonText();
  }

  updateButtonText() {
    this.buttonText = (this.snapped) ? "Snapped :-)" : "Snap me !!";
  }
}
