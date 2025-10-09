#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /home/ubuntu/prod/hoosat-proxy

# Pull latest image
echo "📦 Pulling latest Docker image..."
docker-compose -f docker-compose.prod.yml pull

# Stop and remove old container
echo "🛑 Stopping old container..."
docker-compose -f docker-compose.prod.yml down

# Start new container
echo "▶️  Starting new container..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for health check
echo "⏳ Waiting for service to be healthy..."
sleep 10

# Check if container is running
if [ "$(docker ps -q -f name=hoosat-proxy)" ]; then
    echo "✅ Deployment successful!"

    # Show container logs
    echo "📋 Recent logs:"
    docker logs --tail 50 hoosat-proxy
else
    echo "❌ Deployment failed! Container is not running."
    exit 1
fi

# Clean up old images
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "🎉 Deployment completed!"