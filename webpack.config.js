const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

var node_modules_dir = path.join(__dirname, 'node_modules');

process.env.BABEL_ENV = TARGET;

function getEntry() {
    var jsPath = path.resolve(PATHS.app, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(PATHS.app, 'js', item);
        }
    });
    return files;
}

const common = {
    cache: false,
    devtool: "source-map",
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(path);
    },
    context: __dirname,
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    entry: getEntry(),
    // Add resolve.extensions.
    // '' is needed to allow imports without an extension.
    // Note the .'s before extensions as it will fail to match without!!!
    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx']
    },
    /*output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },*/
    output: {
        path: path.resolve(PATHS.build, 'js'),
        publicPath: PATHS.build + "/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        noParse: [],
        loaders: [
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                loaders: ['style', 'css'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            },
            // Set up jsx. This accepts js too thanks to RegExp
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default. If you need something
                // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                loaders: ['babel?cacheDirectory'],
                // Parse only app files! Without this it will go through entire project.
                // In addition to being slow, that will most likely result in an error.
                include: PATHS.app
            }
        ]
    }
};
//common.addVendor('react', path.resolve(node_modules_dir, 'react/dist/react.min.js'));
//common.addVendor('react-dom', path.resolve(node_modules_dir, 'react-dom/dist/react-dom.min.js'));
//common.addVendor('jquery', path.resolve(bower_dir, 'jquery/dist/jquery.min.js'));

// Default configuration. We will return this if
// Webpack is called outside of npm.
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        // 提供source map
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            //
            // If you use Vagrant or Cloud9, set
            // host: process.env.HOST || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default
            // localhost
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true // --save
            })
        ]
  });
}

if(TARGET === 'build') {
    module.exports = merge(common, {
        devtool: 'source-map',
    });
}
