const webpack = require('webpack');
module.exports = {
  plugins: [
    [
      "component",
      {
        "libraryName": "mint-ui",
        "style": true
      },
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  ],
},
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
  // presets: ["@vue/app"],
}
