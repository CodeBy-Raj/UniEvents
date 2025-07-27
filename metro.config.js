const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro");
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = mergeConfig(getDefaultConfig(__dirname), {
  // your existing custom resolver or transformer settings go here
});

// Wrap with NativeWind and point at your Tailwind entry file
module.exports = withNativeWind(baseConfig, {
  input: './global.css'
});