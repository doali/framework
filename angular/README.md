# Angular

_Framework développé par google permettant de réaliser des applications à page unique dites SPA (Single Page Application)_

Technologies : `HTML, CSS (SCSS, LESS), Typescript, Javascript`

## Installation

- node, npm
- framework angular and CLI (Command Line Interface) `npm i -g @angular/cli`
  - > Vérifier l'installation `ng v`

## Création application

_Exemple repris du [tuto débuter avec angular](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular) d'openclassrooms_

`ng new snapface --style=scss --skip-tests=true`

> Une application angular peut-être vue comme une arborescence de components

## Running

> /!\ Il faut lancer le server en précisant l'adresse `0.0.0.0` lorsqu'on utilise docker...
> Sinon le site est inaccessible depuis l'hôte... [justification](https://dev.to/vanwildemeerschbrent/docker-angular-setup-issue-exposed-port-not-accessible-98m)

- lancer le serveur au sein du conteneur `ubuntu@78bd6ae1f595:/volume/data/new_school/snapface$ ng serve --host 0.0.0.0`
  - depuis un client dans le conteneur `curl http://localhost:4200`
  - depuis un client de l'hôte (firefox, curl) `http://localhost:4242` selon le port mappé `-p 4242:4200` dans ce cas
    - ou `http://127.0.0.1:4242` (ou directement l'adresse IP si le chargement est trop long...)

> Le point d'entrée de l'application
- d'un point de vue HTML est le fichier `index.html` contenant la paire de balises `<app-root></app-root>`
- d'un point de vue composant `AppComponent` est le composant racine de l'application

## Components : décorateur `@Component`
> C'est l'association du tryptique
- `.scss` vue `SCSS, CSS, LESS`
- `.ts` controleur `Typescript`
- `.html `contenu structuré `HTML`

> Best practices, tout composant devrait implémenter l'interface `ngOnInit` et redéfinir la méthode `ngOnInit()` \
> Le framework lors de la création d'une instance du composant invoquera à sa création la méthode `ngOnInit()` \
> C'est donc un moyen d'initialiser le composant

### Injection

> Les propriétés d'un component peuvent être injectées depuis le component parent

**Déclaration, définition, ...**
- on créé tout d'abord un modèle de données `FaceSnap` présent dans `src/app/models/face-snap.model.ts`
- on définit dans le component `FaceSnapComponent` un attribut `@Input() faceSnap!: FaceSnap;` qui sera peuplé par son parent `AppComponent`
- on créé dans le parent des instances du modèle `oneFaceSnap!: FaceSnap;` et pour `anotherFaceSnap!: FaceSnap;`
  - que l'on initialise `[...] this.oneFaceSnap = new FaceSnap( [...]` et pour `[...] this.anotherFaceSnap = new FaceSnap( [...]`

**Liaisons**
- on réalise la liaison entre le component `FaceSnapComponent` et son parent `AppComponent` dans la **vue** du parent `src/app/app.component.html` grace à l'*attribute binding*.
```html
<app-face-snap [faceSnap]="oneFaceSnap"></app-face-snap>
<app-face-snap [faceSnap]="anotherFaceSnap"></app-face-snap>
```

### Création

`ng generate component face-snap` va générer un répertoire contenenant entre autre la classe `FaceSnapComponent`

> `ng g c face-snap` pour la commande avec raccourcis

## Bindings (liaisons)
### String interpolation `{{ }}`
> `{{<variable_attribut_classe}}` placée dans le `.html` permet d'évaluer l'expression liée à une "variable" (propriété, attribut, ...) d'un component

### Attribute binding `[]` (liaison de données)

`<img src="{{ imageUrl }}" alt="{{ title }}">`

> mais il vaut mieux utiliser la forme suivante (car le type des attributs n'est pas forcément un `string`)

`<img [src]="imageUrl" [alt]="title">`

### Event binding `()` (liaison d'évènements)

> `<button (click)="onAddSnap()">Oh Snap!</button>` lie la méthode `onAddSnap()` définie dans le `.ts` à l'évènement `click`

## Directives

> Classe qui opère sur un élément du DOM

### Directives structurelles `*ng...`

- `*ngIf=<expression>` évaluée à *truthy* permet d'ajouter un élément dans le DOM (retiré si falsy)

```html
<p *ngIf="faceSnap.location">Présent en {{ faceSnap.location }}</p>
```

ou encore sur des components

```html
<app-face-snap [faceSnap]="lastFaceSnap" *ngIf="lastFaceSnap.imageUrl"></app-face-snap>
```

> Réfléchir lorsqu'on utilise une évaluation de fonction dans l'expression... problèmes de performance ?

- `*ngFor` permet d'itérer sur un tableau (ou tout autre itérable) et d'insérer dans le DOM les éléments du tableau.

```html
<div *ngFor="let element of faceSnaps">
    <app-face-snap [faceSnap]="element"></app-face-snap>
</div>
```

ou encore

```html
<app-face-snap [faceSnap]="element" *ngFor="let element of faceSnaps"></app-face-snap>
```
## Pipes

> Permet de formater un donnée (par exemple reçue du backend) mais de conserver sa valeur (pour par exemple conserver le format de ce qui a été reçu)

*String*
Exemple de pipe
- LowerCasePipe `<p *ngIf="faceSnap.location">Présent en {{ faceSnap.location | lowercase}}</p>`
- UpperCasePipe `<button (click)="onSnap()">{{ buttonText | uppercase}}</button>`
- TitleCasePipe `<h2>{{ faceSnap.title | titlecase }}</h2>`

*Date*
> On peut configurer un pipe au moyen de `:`

Exemple pour le pipe [DatePipe](https://angular.io/api/common/DatePipe)
- sans configuration `<p>Mis en ligne le {{ faceSnap.createdDate | date }}</p>`
- avec configuration `<p>Mis en ligne {{ faceSnap.createdDate | date: 'à HH:mm, le d MMMM yyyy' }}</p>`

> On ne peut les utiliser que dans le fichier template à savoir le `.html` (par exemple face-snap.component.html)

*Nombre*

- DecimalPipe `<p>{{ 1234567.89 | number: '1.0-0' }}</p>`
- PercentPipe `<p>{{ 0.123 | percent }}</p>`
- CurrencyPipe

*Observable*

- [AsyncPipe](https://angular.io/api/common#pipes)

## Services : décorateur `@Injectable`

> Permet de mutualiser des données, des actions, (CRUD par exemple)...

- Création

`ng generate service face-snap` va générer un répertoire contenenant entre autre la classe `FaceSnapsService`

> Préférable de créer un répertoire `service` sous `app`

```javascript
providedIn: 'root'
```

> Indique que le service sera disponible à la racine de l'application et qu'il n'existera qu'**une** seule instance

- Injection

> Il suffit de passer le service au constructeur du component

```javascript
export class FaceSnapListComponent implements OnInit {
  faceSnaps!: FaceSnap[];

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    // this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();
    this.faceSnaps = this.faceSnapsService.faceSnaps;
  }
}
```

## Routage
## Styles

### Static

Le comportement des styles est le suivant

- portée limitée au component uniquement
- pas d'héritage (pour les components enfants)

Ainsi, pour le component `FaceSnapComponent` le styles définis dans `face-snap.component.scss`

```css
.face-snap-card {
    width: 35%;

    img {
        width: 100%;
    }
}
```

ont une portée limitée dans la déclaration `<app-face-snap ...></app-face-snap>` à ce qui est défini dans `face-snap.component.html`

```html
<div class="face-snap-card">
  ...
</div>
```

> Les styles et les classes seront donc encapsulés

- /!\ Seul le fichier `styles.scss` permet de déclarer des styles globaux

### Dynamic

Avec les directives par attribut `[...]`

- Avec la directive `[ngStyle]`
  - une clef indique le style CSS à modifier
  - une valeur indique la valeur associée au style

```html
<span [ngStyle]="{ color: 'rgb(0, ' + faceSnap.snaps * 255 + ', 0)' }">{{ faceSnap.snaps }}</span>
```

> [ngStyle] ajoute une propriété en @Input qui est identifiée par ngStyle, la créé et la lie directement 

- Avec `[ngClass]`
  - une clef indique le **nom** de classe du CSS à appliquer
  - une valeur indique une expression conditionnelle

```html
<div class="face-snap-card" [ngClass]="{ snapped: faceSnap.snaps == 1}">
  ...
</div>
```

> `<div [ngClass]="{ 'class-name': condition }"></div>`

## Biblio

- [openclassrooms](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular)
- [ganatan](https://www.ganatan.com/tutorials/demarrer-avec-angular)