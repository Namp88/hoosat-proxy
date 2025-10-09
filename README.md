# Hoosat Proxy API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x%20%7C%2020.x-339933?logo=node.js)](https://nodejs.org/)

Public REST API proxy for Hoosat blockchain built with NestJS and [hoosat-sdk](https://github.com/Hoosat-Oy/hoosat-sdk).

## 📑 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Running the App](#-running-the-app)
- [API Documentation](#-api-documentation)
- [Available Endpoints](#-available-endpoints)
- [Response Format](#-response-format)
- [Examples](#-examples)
- [Development](#️-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Docker](#-docker)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

- ✅ **RESTful API** for all Hoosat blockchain operations
- ✅ **Swagger Documentation** at `/docs`
- ✅ **Standardized responses** with success/error format
- ✅ **Environment-based configuration**
- ✅ **Health checks** for monitoring
- ✅ **Global error handling**
- ✅ **Request validation** with class-validator
- ✅ **TypeScript** for type safety
- ✅ **Production ready**

## 📋 Prerequisites

- **Node.js** 18.x or 20.x
- **npm** or **yarn**
- **Hoosat Node** (local or remote) - [Get Hoosat Node](https://github.com/Hoosat-Oy/HTND)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Namp88/hoosat-proxy.git
cd hoosat-proxy

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your Hoosat node settings
nano .env  # or your favorite editor
```

## ⚙️ Configuration

Edit `.env` file:

```bash
# Server
PORT=3000

# Hoosat Node
HOOSAT_HOST=127.0.0.1    # Your Hoosat node host
HOOSAT_PORT=42420         # Your Hoosat node port
HOOSAT_TIMEOUT=10000

# API
API_PREFIX=api
API_VERSION=v1
```

## 🏃 Running the app

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:3000/docs
- **API Base URL**: http://localhost:3000/api/v1

## 🔗 Available Endpoints

### Node Information

- `GET /api/v1/node/info` - Get node information
- `GET /api/v1/node/blue-score` - Get virtual selected parent blue score
- `GET /api/v1/node/hashrate` - Estimate network hashrate
- `GET /api/v1/node/coin-supply` - Get coin supply information
- `GET /api/v1/node/health` - Health check

### Blockchain

- `GET /api/v1/blockchain/tip-hash` - Get selected tip hash
- `GET /api/v1/blockchain/block/:hash` - Get block by hash
- `GET /api/v1/blockchain/blocks?lowHash=...` - Get multiple blocks
- `GET /api/v1/blockchain/count` - Get block count
- `GET /api/v1/blockchain/dag-info` - Get DAG information

### Network

- `GET /api/v1/network/info` - Get current network
- `GET /api/v1/network/peers` - Get peer addresses
- `GET /api/v1/network/connected-peers` - Get connected peers info

### Address

- `GET /api/v1/address/:address/balance` - Get address balance
- `POST /api/v1/address/balances` - Get multiple address balances
- `POST /api/v1/address/utxos` - Get UTXOs by addresses

### Mempool

- `GET /api/v1/mempool/entry/:txId` - Get mempool entry by transaction ID
- `GET /api/v1/mempool/entries` - Get all mempool entries
- `POST /api/v1/mempool/entries-by-addresses` - Get entries by addresses

### Transaction

- `POST /api/v1/transaction/submit` - Submit signed transaction

## 📝 Response Format

All endpoints return responses in this format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "timestamp": "2025-01-10T12:00:00.000Z",
  "path": "/api/v1/node/info"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2025-01-10T12:00:00.000Z",
  "path": "/api/v1/node/info"
}
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start dist/main.js --name hoosat-proxy

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

### Environment Variables for Production

Make sure to set appropriate values in your production `.env`:

```bash
# Use production Hoosat node
HOOSAT_HOST=your-production-node.com
HOOSAT_PORT=42420

# Adjust timeouts for production
HOOSAT_TIMEOUT=15000

# Set production port
PORT=3000
```

## 🐳 Docker

Build and run with Docker:

```bash
# Build Docker image
docker build -t hoosat-proxy .

# Run container
docker run -d \
  -p 3000:3000 \
  -e HOOSAT_HOST=your-node-host \
  -e HOOSAT_PORT=42420 \
  --name hoosat-proxy \
  hoosat-proxy

# View logs
docker logs -f hoosat-proxy
```

Or use Docker Compose:

```bash
# Start with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📖 Examples

### Get node information

```bash
curl http://localhost:3000/api/v1/node/info
```

### Estimate network hashrate

```bash
curl "http://localhost:3000/api/v1/node/hashrate?windowSize=1000"
```

### Get block by hash

```bash
curl http://localhost:3000/api/v1/blockchain/block/BLOCK_HASH
```

### Get address balance

```bash
curl http://localhost:3000/api/v1/address/hoosat:qz7ulu.../balance
```

### Get UTXOs for addresses

```bash
curl -X POST http://localhost:3000/api/v1/address/utxos \
  -H "Content-Type: application/json" \
  -d '{"addresses": ["hoosat:qz7ulu...", "hoosat:qyp4ka..."]}'
```

### Get mempool entries

```bash
curl http://localhost:3000/api/v1/mempool/entries
```

### Submit transaction

```bash
curl -X POST http://localhost:3000/api/v1/transaction/submit \
  -H "Content-Type: application/json" \
  -d '{
    "version": 0,
    "inputs": [...],
    "outputs": [...],
    "lockTime": "0",
    "subnetworkId": "0000000000000000000000000000000000000000",
    "gas": "0",
    "payload": ""
  }'
```

### Check health

```bash
curl http://localhost:3000/api/v1/node/health
```

## 🛠️ Development

```bash
# Generate new module
nest g module modules/your-module
nest g controller modules/your-module
nest g service modules/your-module

# Format code
npm run format

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Hoosat SDK](https://github.com/Namp88/hoosat-sdk) - TypeScript SDK for Hoosat blockchain
- [Hoosat Node (HTND)](https://github.com/Hoosat-Oy/HTND) - Official Hoosat node implementation
- [Hoosat Website](https://hoosat.fi) - Official Hoosat project website
- [Documentation](https://docs.hoosat.fi) - Hoosat documentation

## 💬 Support

- Open an [Issue](https://github.com/Namp88/hoosat-proxy/issues) for bug reports or feature requests
- Join our [Discord](https://discord.gg/hoosat) for community support

---

Made with ❤️ by the Hoosat community