# WordPress plugin dor Revisual And DC

## Plugin Objectives
- Install the loader script on WordPress page (frontend).
- Install the alerts script on WordPress page (frontend).
- Support revisual/dc short codes
- List all the short codes in the plugin page
- Introduce build block for easy widget embedding.

## Setup
It requires docker and npm running on the host machine.

1. [Install wp-env tool](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#installation)
2. Clone the repository
3. Open `plugin/revisual` directory in the terminal
3. Run `npm install`
4. Run `wp-env start`
5. Run `npm start` to start the development compiler.
6. Open `http://localhost:8889` in the browser. Port may be different, check the output of the `wp-env start` command. Login with admin/password.
7. Activate the plugin if not activated already.


## Development

### Public assets
Public assets such as images, CSS, and JS files should be placed in the `plugins/revisual/public/`directory.

### Backend/PHP
PHP code starts execution in `plugin/revisual/revisual.php`. All PHP code should be placed in the `plugin/revisual/includes` directory.

### Plugin admin page

Admin page is built using React and Webpack. The entry point is `plugin/revisual/index.js`. This index.js is a bootstrap
file that registers the plugin block, its sidebar panel (`src/blockEditor`). Also, an app/component that 
renders the plugin settings page (`src/adminPanel`).

Both of these modules (block and settings page) share reducers, actions and hooks. The common components, eventually, can land into
`src/commonComponents` directory. 

### WP version
WP version is specified in .wp-env.json file. The lowest version supported is `6.2.6`. To test with newer version of WP,
change the version, e.g. `6.7`.
After changing version, run `wp-env stop` and `wp-env start` again. In case you get error message, try to remove the .wp-env cache folder.
You can learn its location by executing: `wp-env install-path`, then simply `rm -rf` the cache folder.

## Production
Production build is created using `npm run build`. This command creates a `build` directory in the plugin root. 
If you run this command, and go back to `npm start`, your build block may not work properly. Remove the files in the `build` directory
and re-run `npm start` to return to development mode.


## Deployment
To deploy the plugin, you need to create a zip file of the plugin directory. You can do this by running `npm run zip` command.

