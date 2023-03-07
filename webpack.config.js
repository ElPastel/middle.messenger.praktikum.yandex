const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PugPlugin = require('pug-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src', 'index.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js',
		clean: true
	},
	cache: false,
	devServer: {
		port: 3000,
		open: true,
		hot: true,
		static: {
			directory: path.join(__dirname, 'dist')
		},
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.(svg|png|jpe?g|gif)$/i,
				type: 'asset',
				generator: {
					filename: 'images/[name][ext]'
				}
			},
			{
				test: /\.pug$/,
				loader: PugPlugin.loader
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['postcss-preset-env']]
							}
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.ts$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									corejs: 3,
									useBuiltIns: 'usage',
									targets: { node: 'current' }
								}
							],
							['@babel/preset-typescript']
						]
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			inject: 'body',
			scriptLoading: 'blocking',
			alwaysWriteToDisk: true
		}),
		new HtmlWebpackHarddiskPlugin({
			outputPath: path.resolve(__dirname, 'dist')
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css'
		})
	],
	optimization: {
		minimizer: [
			new TerserPlugin(),
			new CssMinimizerPlugin({
				test: /.css$/,
				minimizerOptions: {
					preset: [
						'default',
						{
							discardComments: { removeAll: true }
						}
					]
				}
			}),
			new ImageMinimizerPlugin({
				test: /\.(jpe?g|png|gif|svg)$/i,
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: ['imagemin-mozjpeg', 'imagemin-optipng', 'imagemin-svgo']
					}
				},
				loader: false
			})
		]
	}
};

