# Todo List Application

## Introduction

Ce projet est une application de gestion de tâches (Todo List) développée avec **NestJS** pour le backend et **React** pour le frontend. L'objectif principal de cette application est d'offrir aux utilisateurs une interface intuitive pour ajouter, modifier, supprimer et afficher des tâches. Ce document décrit les choix technologiques et les décisions prises au cours du développement.

## Technologies Utilisées

- **Backend :** 
  - **NestJS**
  - **Prisma**
  
- **Frontend :**
  - **React**
  - **Material-UI**

## Choix et Décisions

### 1. Architecture

J'ai opté pour une architecture de type **MVC (Modèle-Vue-Contrôleur)** pour séparer les préoccupations et rendre le code plus maintenable. Le modèle représente les données (tâches), la vue est l'interface utilisateur et le contrôleur gère la logique métier.

### 2. Gestion des Tâches

- **CRUD** : L'application permet d'effectuer des opérations de création, lecture, mise à jour et suppression sur les tâches.

### 3. Interface Utilisateur

- **Material-UI**

### 4. Difficultés rencontré

J'ai rencontré une difficulté sur l'update des tâches. L'ancien nom de la tâche était gardé en mémoire sans être remplacé par le nouveau.

## Installation

1. **Clone le dépôt** :
   ```bash
   git clone <url-du-repo>

2. **Start le back-end** :
    ```bash
    yarn start:dev

3. **Start le front-end** :
    ```bash
    yarn dev
