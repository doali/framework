import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
  private _faceSnaps: FaceSnap[] = [{
    id: 1,
    title: "ginkgo",
    description: "espèce d'arbres et la seule représentante actuelle de la famille des Ginkgoaceae. C'est aussi la seule espèce actuelle de la division des Ginkgophyta [wikipedia]",
    createdDate: new Date(),
    snaps: 0,
    imageUrl: "https://images.vexels.com/media/users/3/316639/isolated/lists/e096aaed41b1fa15921450147f547b63-ginkgo-biloba-flat-leaves.png"
  }, // "./assets/img/ginkgo_1.png"
  {
    id: 2,
    title: "chêne",
    description: "La feuille de chêne est la feuille issue de diverses espèces d'arbres du genre Quercus. Pour celles des chênes caducifoliés, elles se caractérisent par une forme crénelée ou par une division en lobes [Wikipedia]",
    createdDate: new Date(),
    snaps: 0,
    imageUrl: "https://img2.freepng.fr/20180430/cyw/kisspng-leaf-oak-drawing-tree-clip-art-gland-5ae72b72c01564.1554009715250993787868.jpg"
  },
  {
    id: 3,
    title: 'Buis',
    description: 'Buxus (les buis) est un genre de plantes dicotylédones de la famille des Buxacées qui regroupe environ 90 espèces originaires de tous les continents (distribution intercontinentale disjointe), présentes principalement dans les régions tropicales et subtropicales. [Wikipedia]',
    createdDate: new Date(),
    snaps: 0,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/BuisFeuille.jpg/220px-BuisFeuille.jpg',
    location: 'Rhône et Drôme'
  }];

  getAllFaceSnaps(): FaceSnap[] {
    return this._faceSnaps;
  }

  public get faceSnaps(): FaceSnap[] {
    return this._faceSnaps;
  }

  snapById(snapId: number): FaceSnap {
    let snapsId: FaceSnap[] = this.faceSnaps.filter((element: FaceSnap) => {
      element.id === snapId;
    });

    if (snapsId.length == 1) {
      return snapsId[0]
    } else {
      throw new Error("FaceSnap not found");
    }
  }

  getFaceSnapById(faceSnapId: number): FaceSnap {
    const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!faceSnap) {
      throw new Error('FaceSnap not found!');
    } else {
      return faceSnap;
    }
  }

  snapFaceSnapById(snapId: number, snapType: 'snap' | 'unsnap'): void {
    let faceSnap = this.getFaceSnapById(snapId);
    (snapType == 'snap') ? faceSnap.snaps++ : faceSnap.snaps--;
  }
}
