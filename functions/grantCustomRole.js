const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const grantCustomRole = functions.region('us-east4')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      const message = 'Request not authorized. User must be logged in.'
      console.error(message)
      return { error: message }
    }

    if (context.auth.token.admin !== true &&
        context.auth.token.email !== 'erickpetru@gmail.com') {
      const message = 'Request not authorized. User must be an admin to fulfill request.'
      console.error(message)
      return { error: message }
    }

    const email = data.email
    const role = typeof data.role === 'undefined' ? 'customer' : data.role

    const user = await admin.auth().getUserByEmail(email)
    if (!user) {
      const message = `Request not completed. ${email} was not found.`
      console.error(message)
      return { error: message }
    }

    if (user.customClaims && user.customClaims.role === role) {
      const message = `${email} was already ${role}.`
      console.log(message)
      return message
    }

    await admin.auth().setCustomUserClaims(user.uid, { role })

    const message = `Request fulfilled! ${email} is now ${role}.`
    console.log(message)
    return message
  })

exports = module.exports = grantCustomRole
