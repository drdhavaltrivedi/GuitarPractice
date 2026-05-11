const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Prioritize 'react-native' first for mobile, then 'main' (CJS) to avoid import.meta issues in dependencies like zustand on web
config.resolver.resolverMainFields = ['react-native', 'main', 'browser'];
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
