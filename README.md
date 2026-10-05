# AI Chatbot Search

Portfolio project that provides an authenticated AI chatbot using:

- **Groq LLM** (OpenAI-compatible API)
- **Wikipedia search** for source snippets and citations
- **MongoDB** for users and per-user chat history
- **JWT + bcrypt** for authentication

Users can create multiple chats, ask questions, receive AI-generated answers with Wikipedia sources, and manage their previous conversations.

## Live Demo

https://ai-chatbot-search.vercel.app

## Features

- Register and login with JWT authentication
- Password hashing with bcrypt
- Protected frontend and backend routes
- Ask questions and receive AI-generated answers
- Groq LLM integration
- Wikipedia source search with citations
- Markdown rendering for assistant responses
- Start new conversations
- Automatic chat title generation
- Rename chats
- View previous chats in the sidebar
- Delete chats
- Clear messages from a chat
- User profile information
- Logout
- Dark / Light mode
- Search suggestion chips
- Responsive React interface

## How it works

1. **User question** — the user sends a message from the React chat interface
2. **Wikipedia search** — the backend searches Wikipedia for relevant information
3. **Context preparation** — Wikipedia titles and snippets are added to the AI request
4. **Groq LLM** (`openai/gpt-oss-120b`) — generates the answer using the user's message and recent conversation history
5. **Sources** — Wikipedia titles, snippets, and links are returned with the answer
6. **MongoDB** — the user message, assistant response, and sources are stored in the chat history

The conversation history sent to the model is limited to the most recent messages.

> This project uses Wikipedia as its search/source provider. It is not a general web-search engine and does not use vector embeddings or a vector database.

## Tech Stack

| Layer    | Technology                                              |
| -------- | ------------------------------------------------------- |
| Frontend | React 18, Vite, Axios, React Router, react-markdown     |
| Backend  | Node.js, Express, Mongoose, JWT, bcryptjs, dotenv, cors |
| Database | MongoDB Atlas                                           |
| AI       | Groq + OpenAI-compatible API                            |
| Search   | Wikipedia MediaWiki API                                 |
| Hosting  | Vercel                                                  |

## Project Structure

    ai-chatbot-search/
    ├── docs/                    # Screenshots
    ├── client/                  # React + Vite frontend
    │   ├── src/
    │   │   ├── components/      # Chat UI, sidebar, modals
    │   │   ├── context/         # Authentication context
    │   │   ├── pages/           # Login, Register, ChatPage
    │   │   └── utils/           # Axios API client
    │   ├── index.html
    │   ├── package.json
    │   └── vite.config.js
    ├── server/                  # Express backend
    │   ├── middleware/          # JWT authentication
    │   ├── models/              # User and Chat schemas
    │   ├── routes/              # Auth and chat APIs
    │   ├── utils/
    │   │   ├── ai.js            # Groq LLM integration
    │   │   └── wikipedia.js     # Wikipedia search
    │   ├── index.js
    │   ├── package.json
    │   └── .env.example
    ├── README.md
    └── vercel.json

## Setup

### Backend

    cd server
    npm install
    # set environment variables (see below)
    npm run dev   # http://localhost:5000

### Frontend

    cd client
    npm install
    npm run dev   # http://localhost:3000

## Environment Variables

| Variable         | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `MONGODB_URI`    | MongoDB connection string                    |
| `JWT_SECRET`     | JWT signing and verification secret          |
| `OPENAI_API_KEY` | Groq API key                                 |
| `PORT`           | Local backend port (default `5000`)           |

`OPENAI_API_KEY` is the environment-variable name used by the project for the Groq API key.

## API

| Method | Endpoint                        | Auth |
| ------ | ------------------------------- | ---- |
| POST   | `/api/auth/register`            | No   |
| POST   | `/api/auth/login`               | No   |
| GET    | `/api/auth/me`                  | JWT  |
| GET    | `/api/chats`                    | JWT  |
| POST   | `/api/chats`                    | JWT  |
| GET    | `/api/chats/:id`                | JWT  |
| POST   | `/api/chats/:id/message`        | JWT  |
| PATCH  | `/api/chats/:id`                | JWT  |
| DELETE | `/api/chats/:id/messages`       | JWT  |
| DELETE | `/api/chats/:id`                | JWT  |

Header:

    Authorization: Bearer <token>

## AI

The backend uses Groq through the OpenAI-compatible SDK.

Current model:

    openai/gpt-oss-120b

The application:

- Searches Wikipedia for relevant source information
- Uses the retrieved snippets as context
- Includes recent conversation history
- Sends the request to Groq
- Returns the generated answer with Wikipedia sources

The model is not streamed; the complete response is returned after generation.

## Deployment

    Vercel
    ├── React + Vite frontend
    └── Express backend
            ↓
       MongoDB Atlas
            ↓
      Groq + Wikipedia

The frontend and backend are deployed through the same Vercel project.

Production API requests use:

    /api/*

Vercel routes API requests to the Express backend while normal application routes are handled by the React frontend.

## Security notes

- Passwords are hashed with bcrypt
- JWT authentication protects private API routes
- Chat queries are scoped to the authenticated user
- MongoDB credentials and JWT secrets are stored through environment variables
- No API keys are committed to the repository
- Wikipedia source links use `noopener noreferrer`
- The frontend uses `react-markdown` without raw HTML rendering
- Production CORS should use an explicit allowed-origin list rather than `*`

## Limitations

- Wikipedia is the only search/source provider
- It is not a general web-search engine
- No embeddings or vector database are used
- No formal AI accuracy benchmark is included
- LLM responses may contain incorrect information
- Wikipedia content is used as supporting context and is not independently verified
- AI responses are not streamed

## Portfolio Project

This project demonstrates:

- React frontend development
- Express REST API development
- JWT authentication
- MongoDB and Mongoose
- Groq LLM integration
- Wikipedia API integration
- Markdown rendering
- Multi-chat conversation management
- AI-assisted search with cited sources
- Full-stack deployment with Vercel

## Author

**Aryan Patil** · [GitHub](https://github.com/aryanpm28) · [Live demo](https://ai-chatbot-search.vercel.app)
