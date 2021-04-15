# richen-raterepo-app

To request a production view of the application, either contact me on [my website](https://www.richen.dev) or follow the **Local Development** instructions

Rate your favourite Github repositories! Authenticated and secure, this application was built using [NodeJS](https://nodejs.org/en/), [React Native](https://reactjs.org/), [GraphQL](https://www.apollographql.com/), [Apollo Client](https://www.apollographql.com/docs/react/), [Expo](https://expo.io/), and also includes the following frameworks:

- [Formik](https://www.npmjs.com/package/formik) for client Form Validation
- [Yup](https://www.npmjs.com/package/yup) also for client Form Validation
- [testing-library/jest-native](https://www.npmjs.com/package/@testing-library/jest-native) && [testing-library/react-native](https://www.npmjs.com/package/@testing-library/react-native) for Unit Testing
- [eslint](https://www.npmjs.com/package/eslint) for linting

## Motivation

Originally making this for the [fso2020](https://fullstackopen.com/en/) course, I've decided to maintain it and showcase it.

It shows knowledge of mobile development, user authentication, unit testing, form validation, state management, and infinite scrolling

## Local Development

First follow the steps below for a general guide:

- `git fork` or `git clone` this repository and save it locally
- run `npm install` to get dependencies
- you can run `npm test` or `npm lint` for unit testing and linting

Follow below for configuring with the `richen-raterepo-api` server

For running 100% locally, follow the readme in [richen-raterepo-api]() for local development.

- Change the url in the env file for `raterepo-app` to your local IP address and port from `richen-raterepo-app`.
- Then in `richen-raterepo-app`, either run `npm start` or you can build the application following the [Expo build guide](https://docs.expo.io/distribution/building-standalone-apps/)

## Contributing

Fork this repository. Using the above local development changes.

Make a new branch for your changes and add it to the forked repository you created. Name it related to your fix / refactor `eg. hotfix-styling-login`. Then, make a pull request with your changes and our team will review it.

## TODO

The majority of the older commits seem vague and I plan to add a changelog to accommodate. However, for now the exercises in the application can be viewed:

- [Part 10: React Native](https://fullstackopen.com/en/part10)

Note the links are for Full Stack Open 2021, and this project is based of Full Stack Open 2020. Nothing much has changed in the curriculum from the looks of it.
