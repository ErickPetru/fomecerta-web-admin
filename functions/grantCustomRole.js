const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const grantCustomRole = functions.region('us-east4')
  .https.onCall(async (data, context) => {
    if (!context.auth || context.auth.token.admin !== true) {
      return {
        error: 'Request not authorized. User must be an admin to fulfill request.'
      }
    }

    const email = data.email
    const role = data.role || 'admin'
    const enable = data.enable || true

    const user = await admin.auth().getUserByEmail(email)
    if (!user) {
      return {
        error: `Request not completed. ${email} was not found.`
      }
    }

    if (user.customClaims && user.customClaims[role] === !enable) {
      return enable ?
        `${email} was already ${role}.` :
        `${email} wasn't ${role} yet.`
    }

    await admin.auth().setCustomUserClaims(user.uid, { [role]: enable })

    return {
      result: enable ?
        `Request fulfilled! ${email} is now ${role}.` :
        `Request fulfilled! ${email} isn't ${role} anymore.`
    }
  })

exports = module.exports = grantCustomRole
