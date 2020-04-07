if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'nuxtSSR') {
  exports.nuxtSSR = require('./nuxtSSR');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'grantCustomRole') {
  exports.grantCustomRole = require('./grantCustomRole');
}
