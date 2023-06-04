## Description

Backend for the gamified task management web application `Purriorities`, written on TypeScript.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/art-nova/purriorities-backend.git

```

2. Navigate to the project directory:

```bash
cd purriorities-backend

```

3. Install the dependencies:

```bash
npm install

```

4. Rename the `environment-example.yaml` file in `config` directory based on your target environment (`development.yaml`, `production.yaml` etc.) and fill in your own values.

5. Run the seeding script to load cats into your database.

```bash
# for "development" environment
npm run seed

# for "production" environment
npm run seed:prod

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Testing the app

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```

## Acknowledgments

This project was built using the following major dependencies:

- [NestJS](https://nestjs.com/): A powerful Node.js framework for building scalable and maintainable server-side applications.

- [TypeORM](https://typeorm.io/): A feature-rich Object-Relational Mapping (ORM) library for TypeScript and JavaScript.

We would like to express our sincere appreciation to the developers and contributors of NestJS and TypeORM.
