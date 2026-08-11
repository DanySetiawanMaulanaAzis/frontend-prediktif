const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mfeConfig = withModuleFederationPlugin({

  remotes: {
    "smart_tablev1": "http://localhost:4300/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
  },

});

// 2. Gabungkan dan tambahkan watchOptions di tingkat paling atas (Root Webpack Config)
module.exports = {
  ...mfeConfig,
  watchOptions: {
    ignored: ["**/node_modules/**", "**/.angular/**", "**/dist/**"]
  }
};
