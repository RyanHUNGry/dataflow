<h1 align="center">
    <img src="./static/logo_size.jpg" height="100">
    <p align="center" style="font-size: 18px;">
        Streamline your data workflows 🚀
    </p>
</h1>

## Introduction

**dataflow** is a specialized issue tracker designed to streamline and enhance your data science and data analysis projects. The platform offers a unique approach to project management through the concept of **flows**, while also providing an array of additional features tailored to empower your data-related tasks. Whether you're a data scientist, analyst, or enthusiast, dataflow is here to optimize your workflow.

Please consider that current development is focused on the backend, core infrastructure, and internal developer tooling. A frontend won't be released in the near future. As such, this repository will document application infrastructure, APIs, and other related concepts.

## Table Of Contents

- [Installation](#installation)
    - [NPM](#npm)
    - [Starting a Server](#starting-a-server)
- [TYPO3 setup](#typo3-setup)
    - [Database setup](#database-setup)
    - [Security](#security)
- [Page setup](#page-setup)
    - [Download the Aimeos Page Tree t3d file](#download-the-aimeos-page-tree-t3d-file)
    - [Go to the Import View](#go-to-the-import-view)
    - [Upload the page tree file](#upload-the-page-tree-file)
    - [Go to the import view](#go-to-the-import-view)
    - [Import the page tree](#import-the-page-tree)
    - [SEO-friendly URLs](#seo-friendly-urls)
- [License](#license)
- [Links](#links)

## Installation

### Dependencies

1. Clone the repository and install backend dependencies:

```shell
git clone https://github.com/RyanHUNGry/dataflow.git && cd ./dataflow/backend && npm install

# install from root directory
git clone https://github.com/RyanHUNGry/dataflow.git && cd ./dataflow && npm start --prefix backend
```

2. Create an environment variables file:
```shell
cd backend && touch.env
```

3. Fill out the following environment variables inside `.env`:
```bash
NODE_ENV=...

PG_DEV_DATABASE=...
PG_DEV_USERNAME=...
PG_DEV_PASSWORD=...

DEV_PORT=...

DEV_JWT_SECRET=...

AWS_PUBLIC_KEY:...
AWS_SECRET_KEY:...
```

### Starting a Server
1. Start a server on default `http://localhost:8000`:
```shell
npm start

# run nodemon process for development
npm run watch
```

2. Ping the API with a tool such as [Postman](https://www.google.com/search?q=postman&oq=Postman&aqs=chrome.0.0i433i512l2j69i64j0i433i512j0i512l3j5.1765j0j7&sourceid=chrome&ie=UTF-8)

## Application Infrastructure

## API

## Changelog

**Data Science Workflow Application**
- Production application: [Docker Hub](https://hub.docker.com/repository/docker/fishy3legs/dataflow-api-image/general)
- Production API: [http://54.215.249.98:8000/](http://54.215.249.98:8000/)
