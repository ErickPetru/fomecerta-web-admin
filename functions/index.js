if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'nuxtSSR') {
  exports.nuxtSSR = require('./nuxtSSR');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'grantCustomRole') {
  exports.grantCustomRole = require('./grantCustomRole');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'establishmentTypesWrite') {
  exports.establishmentTypesWrite = require('./establishmentTypesWrite');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'establishmentsWrite') {
  exports.establishmentsWrite = require('./establishmentsWrite');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'menuCategoriesWrite') {
  exports.menuCategoriesWrite = require('./menuCategoriesWrite');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'menuItemsWrite') {
  exports.menuItemsWrite = require('./menuItemsWrite');
}
