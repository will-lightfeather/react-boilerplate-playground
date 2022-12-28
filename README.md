# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

THe following has been added to the boilerplate:

- Typescript support
- Eslint/Prettier
- Husky pre-commit (runs linter on commits)
- Mock Service Worker for mocking API calls
- Sample Component + Test
- Jest-axe (508 automated accessibility testing)
- React-Query
- Feature Toggles
- Better Jest HTML reports
- Code splitting using lazy imports
- Components from [Team-Lightfeather/ui-react-assets](https://github.com/Team-Lightfeather/ui-react-assets) and [storybook](https://team-lightfeather.github.io/ui-react-assets/)

# Installing the private ui-react-assets component library
See https://github.com/Team-LightFeather/ui-react-assets/blob/main/README.md for setting up your GitHub PAT in order to install the lightfeather private npm package

# Building and Running the Docker Image

The project can be run with Docker using the following command:

```
docker-compose build
docker-compose up
```

This will run the application on http://localhost:3000

It can be spun down using the following command:

```
docker-compose down
```

# Mocking API Endpoints

This project has been setup with mock service worker (msw) to help with mocking API endpoints. This is easily toggled through an .env file by setting:

`REACT_APP_MSW_ENABLED=TRUE`

Setting to `FALSE` will disable the msw and allow API calls to be made normally. While active, the msw will pass-through any API calls where a handler has not been setup.

# Absolute imports

The project uses a custom webpack/typescript config via [craco](https://github.com/dilanx/craco) to provide absolute imports. `@` is an alias for the `/src` directory:

```
import { render } from '@/test-utils';
```

# 508 Testing

This project has been setup with jest-axe to run automated accessbility testing. For every new component and page that is built, we have a custom test matcher (`/src/utils/testMatchers.ts`) that can wrap the component to scan for accessibility violations.

```

import { expectRendersWithoutViolations } from '@/test-utils';

test('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(<SampleComponent />);
});
```

# Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Will run lint on all files and display issues that need to be fixed.

### `npm run lint:fix`

Will run lint -- --fix on all files and try to automatically fix as many errors as possible.

### `npm run coverage`

This will run test coverage on the code, and create a file under `/coverage/index.html` which can be viewed in the browser for a UI to show which code lines are missing coverage.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```

```
