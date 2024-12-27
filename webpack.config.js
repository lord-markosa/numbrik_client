const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

require("dotenv").config({ path: "./.env" });

module.exports = function (env, { mode }) {
    const isDevelopment = mode === "development";

    return {
        entry: "./src/index.js",
        output: isDevelopment
            ? {
                  publicPath: "/",
                  clean: true,
              }
            : {
                  path: path.resolve(__dirname, "./build"),
                  filename: "main.js",
                  assetModuleFilename: "media/[name].[contenthash:8][ext]",
                  publicPath: "/",
                  clean: true,
              },
        mode: isDevelopment ? "development" : "production",
        devtool: isDevelopment ? "inline-source-map" : false,
        module: {
            rules: [
                {
                    test: /\.(js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                        },
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: "asset/resource",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            }),
            new ReactRefreshWebpackPlugin(),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(process.env),
            }),
        ],
        resolve: {
            extensions: [".js", ".jsx"],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "build"),
            },
            hot: true,
            historyApiFallback: true,
            port: process.env.PORT || 8080,
            open: true,
        },
    };
};
