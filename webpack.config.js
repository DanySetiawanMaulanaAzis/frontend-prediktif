const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// The remote is loaded by the browser, so this must be a URL the browser can reach.
// docker-compose sets MFE_REMOTE_URL (http://<PUBLIC_HOST>:4300/remoteEntry.js).
const remoteEntry = process.env.MFE_REMOTE_URL || 'http://localhost:4300/remoteEntry.js';

const mfeConfig = withModuleFederationPlugin({

  remotes: {
    "smart_tablev1": remoteEntry,
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
