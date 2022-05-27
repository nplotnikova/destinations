# Destinations

SPA that displays information about some trip destinations.

## Requirements

For development, you will need Node.js installed on your environment.

To see if you already have [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/) installed and check the installed version, run the following commands:

```shell script
$ node --version
v16.13.0

$ npm --version
8.1.0
```

## Installation

### 1. Clone project

```shell script
$ git clone git@github.com:nplotnikova/destinations.git
$ cd destinations
```

### 2. Install dependencies

```shell script
$ npm run install-dependencies
```

### 3. Start & watch

```shell script
$ npm run develop
```

The frontend is running on  `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

The backend is running on `http://localhost:3000/` and is available under `http://localhost:3000/api/`.
It has two endpoints:
* `http://localhost:3000/api/cities`
* `http://localhost:3000/api/cities/{city_name}`

### 4. Simple build for production
Please ensure that `frontend/src/environments/environment.prod.ts` contains valid `GOOGLE_MAPS_API_KEY` value. 

```shell script
$ npm run production
```

### 5. Run tests

```shell script
$ npm run test:frontend
$ npm run test:backend
```
