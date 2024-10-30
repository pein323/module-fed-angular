const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

  module.exports = {
    output: {
      uniqueName: "report",
      publicPath: "auto",
   
      // Add script type for remove JS Error from console
      scriptType: "text/javascript"
    },
    optimization: {
      runtimeChunk: false
    },  
    resolve: {
      alias: {
        ...sharedMappings.getAliases(),
      }
    },
    experiments: {
      outputModule: true
    },
    plugins: [
      new ModuleFederationPlugin({
   
          // For remotes (please Add this 5 Line)
          name: "report",
          filename: "remoteEntry.js",
          exposes: {
              './ReportModule': './/src/app/report/report.module.ts',
          },       
         
          shared: share({
            "@angular/core": { singleton: true, strictVersion: true,
   requiredVersion: 'auto' },
            "@angular/common": { singleton: true, strictVersion: true,
   requiredVersion: 'auto' },
            "@angular/common/http": { singleton: true, strictVersion:
   true, requiredVersion: 'auto' },
            "@angular/router": { singleton: true, strictVersion: true,
   requiredVersion: 'auto' },
   
            ...sharedMappings.getDescriptors()
          })
         
      }),
      sharedMappings.getPlugin()
    ],
   };
