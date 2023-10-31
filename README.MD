# 🚀 enpyapi

Welcome to the ENcycloPYdia (ENPY) API!

## Table of Contents

-   [🛠️ Getting Started](#️️-getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [🚀 Usage](#-usage)
    -   [Endpoints](#endpoints)
    -   [Example Requests](#example-requests)
    -   [📝 Some Quick Notes](#📝-some-quick-notes)
-   [⚙️ Configuration](#️-configuration)
-   [📦 Dependencies](#-dependencies)
-   [🤝 Contributing](#-contributing)
-   [📝 License](#-license)

## 🛠️ Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/)
-   [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/fiattarone/enpyapi.git
    cd enpyapi

    ```

2. **Install Dependencies**

    ```bash
    yarn install

    ```

3. **Start the API**

    ```bash
    yarn start

    ```

## 🚀 Usage

This should solely be used for my project RabbitHole, but be my guest as it's public.

### Endpoints

#### Query Word by API Endpoint

This endpoint allows you to query for a word by its value.

-   **URL**: `/word/:word`
-   **HTTP Method**: GET

#### Generate ApiKey Endpoint

This endpoint allows you to generate a random 32 char ApiKey.

-   **URL**: `/api/`
-   **HTTP Method**: GET

### Example Requests

#### Query Word Example

This example demonstrates how to query a word using the API:

**Request**:

```http
GET /word/apple
```

This example demonstrates how to generate an API key using the API:

**Request**:

```http
POST /api/
Content-Type: application/json
```

**Request Body**

```
{
    "institutionName": "University of Fiattarone",
    "contactEmail": "Fiattarone@me.com",
    "issuedBy": "The Man Himself -- DTF"
}
```

### 📝 Some Quick Notes:

-   Should probably rate limit the apikey endpoint, and make this rate limit probably 10 guesses/day
-   Rotate apikeys annually

## ⚙️ Configuration

### SERVER:

#### ufw:

-   Using ufw to manage ports:
-   -3000: Testing
-   -22: SSH
-   Commands:

```bash
sudo ufw allow XXXX/tcp
```

Enables port XXXX

```bash
sudo ufw enable && sudo ufw status
```

Enables ufw & shows open ports

#### pm2:

-   Using pm2 to run enpyapi in background:
-   Commands:

```bash
pm2 start ~/enpyapi/src/index.js && pm2 monit
```

#### Moving files to server:

-   For files not included in the git clone:

```bash
scp /path/to/local/file username@remote_host:/path/to/destination
```

Moves files from local machine to remote server

### CLIENT:

#### OpenVPN:

-   Reach out to me to get your OpenVPN client configuration. Quite simple. I'll email it over or something. Or maybe I'm a paranoid superstitious nerd that needs you to go to a specific location, then ask you to check under a rock for a USB that will self-detonate after one use. That being said, never contact me on a Friday the 13th. Or even a 13th. Don't even mention mirrors. Apple nerds, you see that shiny apple on the lid of your macbook? Better not have a scratch on it--that counts as a broken mirror. Unless you own a black cat. You see, if you own a black cat, two negatives = positive. Anybody who doesn't know their math obviously isn't quality enough to work on this project. So know your math.

## 📦 Dependencies

-   mongoose
-   mongodb
-   node
-   express
-   express-validator
-   yarn
-   dotenv
-   cross-env
-   express-rate-limit
-   crypto
-   axios
-   stripe

## 🤝 Contributing

--TBD, but just go ahead and submit a PR if that's your thing.

## 📝 License

This project is licensed under the [MIT License] - see the [LICENSE.md](LICENSE.md) file for details.

```

```
