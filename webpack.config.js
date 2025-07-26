const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const target = path.resolve(__dirname, "src/index.ts");
const output = path.resolve(__dirname, "dist");
const isDev = process.env.NODE_ENV === 'development';

const config = {
    entry: target,
    output: {
        path: output,
        filename: 'bundle.js',
    },
    mode: isDev ? 'development' : 'production',
    devServer: {
        port: 8888,
        compress: true,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            target: 'es2015',
                        }
                    }
                ],
                exclude: [/node_modules/],
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            SourceMap: true,
                        }
                    },
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'css',
                        }
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: {
            "path": require.resolve("path-browserify"),
            "url": require.resolve("url-polyfill"),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            title: "cramped room of death",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'static'),
                    to: path.join(output, 'static'),
                    globOptions: {
                        ignore: ['**/.*']
                    }
                }
            ]
        }),
    ],
    optimization: {
        minimizer: [
            new EsbuildPlugin({
                css: true,
            }),
        ]
    }
}

if (!isDev) {
    config.plugins.push(new CleanWebpackPlugin());
}


module.exports = config;