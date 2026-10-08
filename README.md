# LeihenMan

**Langue / Language :** Français | [English](README.en.md)

**Version :** 0.9.0

## Description

LeihenMan est une application réalisée avec Node.js et Express pour gérer une bibliothèque d'objets empruntés entre particuliers.

## Configuration

Créez le fichier de configuration local à partir du modèle. Utilisez la commande correspondant à votre terminal :

PowerShell :

```powershell
Copy-Item .conf.example .conf
```

Linux ou Git Bash :

```bash
cp .conf.example .conf
```

Dans `.conf`, décommentez et renseignez les paramètres suivants :

- `MONGODB_URI` : URI de connexion MongoDB, avec l'utilisateur, le mot de passe, le cluster et la base de données.
- `JWT_SECRET` : clé longue et aléatoire utilisée pour signer et vérifier les jetons d'authentification. La modifier invalide les jetons déjà émis.
- `PORT` : port HTTP de l'application. Il vaut `3000` par défaut.

Le fichier `.conf` contient des paramètres privés et est ignoré par Git ; ne le publiez pas.

## Lancer l'application

Prérequis : Node.js 20.19 ou supérieur, npm et un accès à une base de données MongoDB.

À la racine du projet, installez les dépendances :

```bash
npm install
```

Démarrez ensuite le serveur :

```bash
node --env-file=.conf server.js
```

Le serveur écoute sur le port défini par `PORT` (par défaut `3000`). Si vous modifiez ce port, adaptez l'URL utilisée dans votre client HTTP.

Une fois l'API démarrée, vous pouvez l'interroger avec un client HTTP comme [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

Si votre base de données ne contient encore aucun utilisateur, créez-en un avec une requête `POST` vers `http://localhost:3000/api/auth/signup`. Aucun utilisateur préexistant n'est nécessaire et l'adresse e-mail doit être unique. L'inscription ne connecte pas automatiquement l'utilisateur et ne renvoie pas de jeton.

```json
{
	"firstname": "Test",
	"lastname": "User",
	"email": "test@example.com",
	"password": "ChangeMe123!",
	"role": "user"
}
```

Le champ `role` est facultatif lors de la création ; il peut décrire le type ou les permissions du compte. Pour une inscription publique, attribuez les rôles côté serveur plutôt que de laisser l'utilisateur choisir un rôle privilégié.

Connectez-vous ensuite avec une requête `POST` à `http://localhost:3000/api/auth/login` et le même e-mail et mot de passe. La réponse contient l'identifiant dans `user.userId` et le jeton d'authentification dans `user.token`.

Pour récupérer la liste des articles, envoyez une requête `GET` à :

```text
http://localhost:3000/api/articles
```

Certaines routes sont protégées et nécessitent le jeton obtenu via la route de connexion. Pour ces requêtes, ajoutez l'en-tête `Authorization` au format `Bearer <votre_jeton>`. Le jeton expire après 24 heures. Les routes d'inscription et de connexion ne nécessitent pas de jeton.
