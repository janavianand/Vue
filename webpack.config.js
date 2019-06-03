let webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: {
        // Since we need to load vue in the entry page.
        //vue: 'vue',
        // This is where the `main-content` component is
        index: './src/index.js',
    },
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    context: __dirname,
    devtool: 'source-map',
    module: {
        rules: [
            {
                // vue-loader config to load `.vue` files or single file components.
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
                        css: ['vue-style-loader', {
                            loader: 'css-loader',
                        }],
                        js: [
                            'babel-loader',
                        ],
                    },
                    cacheBusting: true,
                },
            },
            {
                // This is required for other javascript you are gonna write besides vue.
                test: /\.js$/,
                loader: 'babel-loader'
            },
        ],
    },
    /**
     * There are multiple devtools available, check
     * https://github.com/webpack/webpack/tree/master/examples/source-map
     */

    plugins: [
        new webpack.NamedModulesPlugin(),
        // Exchanges, adds, or removes modules while an application is running, without a full reload.
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    resolve: {
        /**
         * The compiler-included build of vue which allows to use vue templates
         * without pre-compiling them
         */
        alias: {
          'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        },
        extensions: ['*', '.vue', '.js', '.json'],
    },
    // webpack outputs performance related stuff in the browser.
    performance: {
        hints: false,
    },
};
