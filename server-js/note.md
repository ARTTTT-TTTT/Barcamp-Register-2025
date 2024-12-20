- docker-compose.yml
- .dockerignore
- Dockerfile

- docker build -t barcamp-server -f Dockerfile .
- docker run -p 3000:3000 barcamp-frontend

- docker build -t barcamp-frontend .   
- docker run -p 8080:8080 barcamp-server    