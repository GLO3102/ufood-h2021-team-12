# Pour livrable 1:
Le restaurant se trouve à l'addresse https://\<ip\>:\<port\>/#/restaurant/

(attention au /#/)

Directions vers le restaurant <- cliquez sur la map

# Pour livrable 2:
Installer et lancer l'application avec npm. Suivre le Design Document

packages supplémentaires à installer en cas d'erreur de dépendance besoin:
```bash
npm install vue-select
npm install vue-js-modal
npm install vue-simple-search-dropdown
```

# Pour livrable 3:
Installer et lanceer l'application avec yarn. Suivre le design document
```bash
npm install --global yarn
yarn install
yarn run serve
```
Dans le pire cas (conflit de package npm et yarn):

-manuellement delete node_modules
-manuellement delete package-lock.json
-manuellement delete yarn.lock
```bash
yarn install
yarn run serve
```

# vue-starter

Kit de départ préconfiguré utilisant [vue-cli](https://cli.vuejs.org/), [ESLint](https://eslint.org/) avec [Prettier](https://prettier.io/) et [Jest](https://jestjs.io/).

## Prérequis
- Git [Windows](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Windows), [Mac](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Mac), [Linux](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Linux)
- [Node.js](https://nodejs.org/en/) (version LTS recommandée)

Vérifier que Node est installé avec la commande:
```bash
node -v
```
Vérifier que Node est installé avec la commande:
```bash
npm -v
```

## Installation

```bash
# install dependencies
npm install
```

## Développement
```bash
# serve with hot reload at localhost:8080
npm run serve
```

## Livrable 1
Faites vos modifications aux fichiers `Home.vue`, `Navigation.vue`, `Restaurant.vue` et `User.vue`. Ajoutez votre HTML dans la balise `<template>` et votre CSS dans la balise `<style>` de chacun des components. Vous pouvez également modifier la structure de fichiers si vous désirez.

## Livrable 2-3
Libre à vous de modifier la structure des fichiers.


## Notes
### ESLint
ESLint est configuré afin de respecter un certain standard de code à travers votre équipe. Il est basé sur la configuration de Prettier. qui rassemble les règles de base populaires. Libre à vous de modifier cette configuration via `.eslintrc.js`.
