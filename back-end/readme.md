# 🎵 LuaPlay - API de Playlists e Mídias

Este é um projeto de back-end desenvolvido em Node.js com Express e MongoDB. Ele permite aos usuários criar, listar e gerenciar playlists e mídias de forma personalizada. A autenticação é baseada em usuários e cada playlist pertence exclusivamente a um usuário.

---

## 📁 Estrutura do Projeto

|back-end/<br>
├── src/<br>
│ ├── controllers/<br>
│ │ ├── playlistController.js<br>
│ │ ├── mediaControler.js<br>
│ │ └── authControler.js<br>
│ ├── docs/<br>
│ │ ├── authDocs.js<br>
│ │ ├── playlistDocs.js<br>
│ │ └── mediaDocs.js<br>
│ ├── middlewares/<br>
│ │ └── authMiddleware.js<br>
│ ├── models/<br>
│ │ ├── Auth.js<br>
│ │ ├── Playlist.js<br>
│ │ └── Media.js<br>
│ ├── routes/<br>
│ │ ├── authRotes.js<br>
│ │ ├── playlistRoutes.js<br>
│ │ └── mediaRouts.js<br>
│ └── config/<br>
│ └── db.js<br>
├── app.js<br>
├── server.js<br>
├── docker-compose.yml<br>
├── dockerfile<br>
├── readme<br>
└── swagger.js<br>

---

## 🚀 Funcionalidades

- ✅ CRUD de **Playlists**
- ✅ CRUD de **Mídias** associadas às playlists
- ✅ Filtro por nome ou ID
- ✅ Autenticação de usuário (via middleware)

---

## 🧪 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB com Mongoose
- JWT (para autenticação)
- Dotenv
- Nodemon (dev)

---

## 🔐 Autenticação

Para acessar as rotas, é necessário estar autenticado. O token JWT deve ser enviado no header:
``` Authorization: Bearer <seu_token> ```

---

## 📌 Endpoints
### Auth - Autenticação de Usuário
### 🔸 POST `/auth/login` 
Fazer Login

### 🔸 POST `/auth/register`
Registar um novo usuário.


### Media - Gerenciamento de medias
### 🔸 POST `/api/medias`
cia uma nova midia

### 🔸 DELETE `/api/medias/{title}`
Deleta uma midia pleo titulo

### 🔸 PATCH  `/api/medias/{id}/favorite`
Atualiza o status de favorito de uma midia.


### Playlist - Gerenciamento de playlists

### 🔸 GET `/api/playlists`
Lista todas as playlists do usuário autenticado.

### 🔸 POST `/api/playlists`
Cria uma nova playlist.

### 🔸 GET `/api/playlists/:id/medias`
Lista todas as mídias da playlist pelo ID.

### 🔸 GET `/api/playlists/name/:name/medias`
Lista mídias da playlist usando o nome.

### 🔸 DELETE `/api/playlists/name/:name`
Remove a playlist com o nome informado.

---

### Como rodar o projeto
Clone o repositório:

```
Copiar
Editar
git clone https://github.com/seu-usuario/luaplay.git
cd luaplay/back-end
```

Instale as dependências:

```
Copiar
Editar
npm install`
```

Configure o .env:

```
MONGO_URI=mongodb://localhost:27017/luaplay
JWT_SECRET=sua_chave_secreta
PORT=3000
```
 
Rode a aplicação:

```
npm run dev
```

