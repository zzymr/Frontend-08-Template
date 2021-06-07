module.exports = {
    entry: './main1.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        // plugins: ["@babel/plugin-transform-react-jsx"]
                        plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement"} ]]
                    }
                }
            }
        ]
    },
    mode: 'development'
}