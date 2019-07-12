This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Star just API

If you just want to run the api json server:

    npm run start:api

### Notes about React apps

- Do I need Redux
  - Props Dilling: pass props down to children that doesn't need it
  - React context: use global Provider
  - Redux: use global Store that can use from anywhere
- 3 redux principles
  - One immutable store:
    - store.dispatch(action)
    - store.subscribe(listener)
    - store.getState()
    - replaceReducer(nextReducer)
  - Actions to change store is use triggers
  - Reducers: are pure functions to update states (given a state, return another)
    - reducer composition:
      - one action handled by one or multiple reducers
      - each reducer can handle one or more actions
  - Each action is handled by a reducer (many reducers) that update a single (unique) store
- Initial Redux
  - 1. create action
  - 2. create reducer
  - 3. create root reducer
  - 4. configure store
  - 5. instantiate store
  - 6.. connect components
  - 7.. pass props via connect
  - 8. dispatch action
- Thunk: a function that wraps an expression to delay its evaluation [it's like a python decorator].
- plugin vscode:
  - ESLint (Dirk Baeumer)
  - Prettier - code formater (Esben Petersen)
  -
- df

### Testing react applications

- Jest: a framework to test react apps
- Helper libraries: React Test Utils
  - shallowRender: render single component
  - renderIntoDocument: render component and children
- Helper libraries: Enzyme (is an abstraction)
  - React test utils in background
  - JSDOM (In-memory DOM)
  - Cheerio is a CSS selector
- Helper libraries: React Testing Library
- To run tests:
  - npm t || npm run test || npm test
  - "test": "jest --watch" test wen we hit save
  - plugin for vscode:
    - snapshot-tools (Alexey Svetliakov)
  - df
- Enzyme:
  - Two ways to render a React component
    - shallow: render single component in isolation:
      - not DOM is created
      - no child components are rendered) [faster]
    - mount: render component with children:
      - DOM is created in memory via JSDOM
      - child components are rendered
      - more realistic
- React Testing Library:
  - https://testing-library.com/docs/react-testing-library/api
  - https://testing-library.com/docs/dom-testing-library/api-queries
  - tests based on what users sees
  - df
- Testing Redux: how to test connected components?
  - Test markup:
  - Test behaviour: action (click, scroll, drag, change) over components
  - Could not find "store" ERROR:
    - 1. Wrap our components in <Provider>:
      - We must instantiate a Provider: return mount(<Provider store={store}><ManageCoursePage /></Provider>);
    - 2. Export plain unconnected component:
      - the easy way: we need update our component.
      - maybe generate an ESLint error, so:
        - // eslint-disable-line import/no-named-as-default
  - Testing actions:
  - Testing thunks:
    - Mock two things:
      - Store: redux-mock-store
      - HTTP Calls: fetch-mock
  - Testing reducers:
  - Testing store:
    - rather than Unit Test we write an Integration test
      - integration between action creators, store and reducer
    - Redux Flow
