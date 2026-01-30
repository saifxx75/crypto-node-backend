# Crypto Node Backend

A real-time **Crypto Price Tracker** backend built with **Node.js** and **Express**. This application fetches live prices for Bitcoin and Ethereum and streams updates to clients using **Server-Sent Events (SSE)**.

## Features

- **Real-time Streaming**: Uses SSE to push live crypto price updates from the CoinGecko API.
- **Job Management**: Admins can start and stop tracking jobs dynamically.
- **Authentication**: Secure JWT-based authentication.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` and `USER` roles.
- **Progress Tracking**: Monitors the progress of ongoing background jobs.

## Tech Stack

- **Framework**: [Express.js](https://expressjs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)
- **Security**: [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing.
- **Data Fetching**: [node-fetch](https://github.com/node-fetch/node-fetch) for API requests.
- **Environment Management**: [dotenv](https://github.com/motdotla/dotenv)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd crypto-node-backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3002
    JWT_SECRET=your_jwt_secret_here
    ```

### Running the Application

- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

The server will be running at [http://localhost:3002](http://localhost:3002).

## API Endpoints

### Authentication
- `POST /api/auth/login`: Authenticate a user and receive a JWT.

### Job Management
- `POST /api/jobs/startJob`: Start a new crypto tracking job (**Admin only**).
- `POST /api/jobs/stopJob`: Stop a currently running job (**Admin only**).
- `GET /api/jobs/jobStatus`: Retrieve the current status and progress of a job.

### Streaming
- `GET /api/stream/events`: Subscribe to real-time event updates via SSE.

## Project Structure

- [./src/app.js](./src/app.js): Application entry point and middleware configuration.
- [./src/server.js](./src/server.js): Server initialization.
- [./src/controllers/](./src/controllers/): Request handlers.
- [./src/routes/](./src/routes/): API route definitions.
- [./src/services/](./src/services/): Business logic and background jobs.
- [./src/middleware/](./src/middleware/): Auth and RBAC middleware.
- [./src/store/](./src/store/): In-memory data storage (for demo purposes).

## License

This project is licensed under the **ISC License**.
