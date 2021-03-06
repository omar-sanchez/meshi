
const HtmlWebPackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                = require('copy-webpack-plugin');
const MinifyPlugin              = require('babel-minify-webpack-plugin')
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const ImaginPlugin              = require('imagemin-webpack');

module.exports = {
    
    mode: 'development',
    optimization:{
        minimizer : [
            new OptimizeCssAssetsPlugin()
        ]
    },
    output:{
        filename: 'main.[contentHash].js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options:{
                            url:false
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options:{
                    attributes: false,
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif|)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder:false
        }),
        new CopyPlugin({
            patterns:[
                { from: 'src/assets/', to: 'assets/' }
            ]
        }),
        new ImaginPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]

}
