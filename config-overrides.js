const {
  override,
  overrideDevServer,
  addBabelPlugins,
  addDecoratorsLegacy,
  addWebpackAlias
} = require("customize-cra")
const path = require("path")

module.exports = {
  webpack: override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),
  
    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      '@core': path.resolve(__dirname, 'src/core')
    }),
    ...addBabelPlugins(
      [
        '@babel/plugin-proposal-pipeline-operator',
        {
          proposal: 'minimal'
        }
      ],
      '@babel/plugin-proposal-do-expressions',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator'
    )
  ),
  devServer: overrideDevServer(config => ({
    ...config,
    disableHostCheck: true
  }))
}