if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'menuItemsWrite') {
  exports.menuItemsWrite = require('./menuItemsWrite');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'nuxtssr') {
  exports.nuxtssr = require('./nuxtssr');
}
