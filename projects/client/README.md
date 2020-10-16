# Of The Day - Client

## Important Notes

- The project is built with Webpack. There are two webpack configs - dev and production. Both use common pieces of the 'base' webpack file.
- The webpack config is also shared with Storybook (used for UI testing). Meaning - when you change the webpack config, make sure you update the storybook folder's version also.
- There is a 'define.js' which defines values that are injected into the code during build. See 'define.ts'.
