# Angular

_Framework développé par google permettant de réaliser des applications à page unique dites SPA (Single Page Application)_

Technologies : `HTML, CSS (SCSS, LESS), Typescript, Javascript`

## Installation

- node, npm
- framework angular and CLI (Command Line Interface) `npm i -g @angular/cli`
  - > Vérifier l'installation `ng v`

## Création application

_Exemple repris du tuto d'openclassrooms_

`ng new snapface --style=scss --skip-tests=true`

> Une application angular peut-être vue comme une arborescence de components

## Running

> /!\ Il faut lancer le server en précisant l'adresse `0.0.0.0` lorsqu'on utilise docker...
> Sinon le site est inaccessible depuis l'hôte... [justification](https://dev.to/vanwildemeerschbrent/docker-angular-setup-issue-exposed-port-not-accessible-98m)

- lancer le serveur au sein du conteneur `ubuntu@78bd6ae1f595:/volume/data/new_school/snapface$ ng serve --host 0.0.0.0`
  - depuis un client dans le conteneur `curl http://localhost:4200`
  - depuis un client de l'hôte (firefox, curl) `http://localhost:4242` selon le port mappé 4242:4200 dans ce cas
    - ou `http://127.0.0.1:4242`

> Le point d'entrée de l'application
- d'un point de vue HTML est le fichier `index.html` contenant la paire de balises `<app-root></app-root>`
- d'un point de vue composant `AppComponent` est le composant racine de l'application

## Components
> C'est l'association du tryptique
- `.scss` vue `SCSS, CSS, LESS`
- `.ts` controleur `Typescript`
- `.html `contenu structuré `HTML`

> Best practices, tout composant devrait implémenter l'interface `ngOnInit` et redéfinir la méthode `ngOnInit()` \
> Le framework lors de la création d'une instance du composant invoquera à sa création la méthode `ngOnInit()` \
> C'est donc un moyen d'initialiser le composant

### Création

`ng generate component face-snap` va générer un répertoire contenenant entre autre le symbole `FaceSnapComponent`

## Bindings (liaisons)
### String interpolation `{{ }}`
> `{{<variable_attribut_classe}}` placée dans le `.html` permet d'évaluer l'expression liée à une "variable" (propriété, attribut, ...) d'un component

### Attribute binding `[]` (liaison de données)

`<img src="{{ imageUrl }}" alt="{{ title }}">`

> mais il vaut mieux utiliser la forme suivante (car le type des attributs n'est pas forcément un `string`)

`<img [src]="imageUrl" [alt]="title">`

### Event binding `()` (liaison d'évènements)

> `<button (click)="onAddSnap()">Oh Snap!</button>` lie la méthode `onAddSnap()` définie dans le `.ts` à l'évènement `click`

## Directives et pipes
## Services
## Routage

## Biblio

- [openclassrooms](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular)
- [ganatan](https://www.ganatan.com/tutorials/demarrer-avec-angular)