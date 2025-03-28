const {override} = require('customize-cra');
const {aliasDangerous, configPaths} = require('react-app-rewire-alias/lib/aliasDangerous');

module.exports = function override(config) {
  return config; // Usuń konfigurację aliasów, jeśli nie jest potrzebna
};