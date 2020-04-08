if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'grantCustomRole') {
  exports.grantCustomRole = require('./grantCustomRole');
}
