import { Component, OnInit } from '@angular/core';
import { FaceSnap } from './models/face-snap.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'snapface';
  oneFaceSnap!: FaceSnap;
  anotherFaceSnap!: FaceSnap;

  ngOnInit(): void {
    // oneFaceSnap
    this.oneFaceSnap = new FaceSnap(
      "ginkgo",
      "espèce d'arbres et la seule représentante actuelle de la famille des Ginkgoaceae. C'est aussi la seule espèce actuelle de la division des Ginkgophyta [wikipedia]",
      new Date(),
      0,
      "https://images.vexels.com/media/users/3/316639/isolated/lists/e096aaed41b1fa15921450147f547b63-ginkgo-biloba-flat-leaves.png"
      // "./assets/img/ginkgo_1.png"
    );

    // anotherFaceSnap
    this.anotherFaceSnap = new FaceSnap(
      "chêne",
      "La feuille de chêne est la feuille issue de diverses espèces d'arbres du genre Quercus. Pour celles des chênes caducifoliés, elles se caractérisent par une forme crénelée ou par une division en lobes [Wikipedia]",
      new Date(),
      0,
      "https://img2.freepng.fr/20180430/cyw/kisspng-leaf-oak-drawing-tree-clip-art-gland-5ae72b72c01564.1554009715250993787868.jpg"
    );
  }
}
