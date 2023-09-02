<h1 align="center">
    <img src="./static/logo_size.jpg" height="100">
    <p align="center" style="font-size: 18px;">
        Streamline your data workflows 🚀
    </p>
</h1>

## Introduction

*dataflow* is a specialized issue tracker designed to streamline and enhance your data science and data analysis projects. The platform offers a unique approach to project management through the concept of *flows*, while also providing an array of additional features tailored to empower your data-related tasks. Whether you're a data scientist, analyst, or enthusiast, *dataflow* is here to optimize your workflow.

Please consider that current development is focused on the backend, core architecture, and internal developer tooling. A frontend won't be released in the near future. As such, this repository will document application architecture, APIs, and other related concepts.

## Table Of Contents

- [Installation](#installation)
    - [NPM](#npm)
    - [Starting a Server](#starting-a-server)
- [Application Architecture](#application-architecture)
    - [Local Architecture](#local-architecture)
- [Links](#links)

## Installation

### Dependencies

1. Clone the repository and install backend dependencies:

```bash
git clone https://github.com/RyanHUNGry/dataflow.git && cd ./dataflow/backend && npm install
```

2. Create an environment variables file:
```bash
cd backend && touch.env
```

3. Fill out the following environment variables inside `.env`:
```bash
NODE_ENV=... # 

PG_DEV_DATABASE=... # development database
PG_DEV_USERNAME=... 
PG_DEV_PASSWORD=...
PG_DEV_HOST=...

DEV_PORT=...

DEV_JWT_SECRET=...

AWS_PUBLIC_KEY:...
AWS_SECRET_KEY:...
```

### Starting a Server
1. Start a server on default `http://localhost:8000`:
```bash
npm start
```

```bash
# run nodemon process for development
npm run watch
```

2. Ping the API with a tool such as [Postman](https://www.google.com/search?q=postman&oq=Postman&aqs=chrome.0.0i433i512l2j69i64j0i433i512j0i512l3j5.1765j0j7&sourceid=chrome&ie=UTF-8)

## Application Architecture

### AWS RDS
*dataflow* uses AWS RDS PostgreSQL instances for data storage. There are three instances for development, testing, and production respectively. 

### AWS S3
*dataflow* uses AWS S3 buckets to store datasets related to a *flow*.

### Local Architecture Diagram
<img src="./static/local.png">

### Production Architecture Diagram
<img src="./static/production.png">

### Testing Suite
*dataflow* comes with full unit and integration test suites for its API.

### Containerization
*dataflow* depends on itself or external cloud services via AWS. There isn't an additional service that needs to be installed on a host. This means that containerizing a working version of *dataflow* only consists of bundling the application itself with the correct environment variables. Since the application itself is stateless due to cloud, there is no need for volumes either.

## API


## Links
1. Production application: [Docker Hub](https://hub.docker.com/repository/docker/fishy3legs/dataflow-api-image/general)
2. Production API: [http://54.215.249.98:8000/](http://54.215.249.98:8000/)
