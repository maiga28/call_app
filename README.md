# Application de Démonstration : Appels Vidéo et Audio avec WebRTC et Django

Ce projet est une application web de démonstration permettant de réaliser des appels vidéo et audio en temps réel. Il utilise **WebRTC** pour les communications peer-to-peer et **Django** comme backend pour la gestion des utilisateurs et la signalisation via WebSocket.

## Fonctionnalités

- **Appels Vidéo** : Établissez des connexions vidéo en temps réel.
- **Appels Audio** : Effectuez des appels uniquement audio.
- **Signalisation via WebSocket** : Gère l'échange des offres, réponses et candidats ICE.
- **Interface utilisateur moderne** : Construite avec **HTML**, **CSS** (avec **Tailwind CSS**) pour une apparence épurée.
- **Gestion des connexions peer-to-peer** : Échange de flux multimédias à l'aide de WebRTC.

---

## Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Python** (version 3.8 ou supérieure)
- **Node.js** (pour gérer les dépendances front-end si nécessaire)
- Un navigateur compatible WebRTC (par exemple, Google Chrome, Firefox)
- Django et ses dépendances (voir `requirements.txt`)

---

## Installation

1. Clonez ce dépôt sur votre machine locale :

```bash
    git clone https://github.com/maiga28/call_app.git
    cd back
"# call_app" 
