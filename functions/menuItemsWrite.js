const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue

const menuItemsWrite = functions.region('us-east4')
  .firestore.document('menuItems/{id}').onWrite((change) => {
    if (change.after.exists) {
      const document = change.after.data()

      if (change.before.exists) {
        const oldDocument = change.before.data()

        if (oldDocument.category.id !== document.category.id) {
          return Promise.all([
            db.doc(`menuCategories/${oldDocument.category.id}`).update({
              usedBy: FieldValue.increment(-1)
            }),
            db.doc(`menuCategories/${document.category.id}`).update({
              usedBy: FieldValue.increment(1)
            }).catch((error) => {
              return error
            })
          ])
        }
      } else {
        return db.doc(`menuCategories/${document.category.id}`).update({
          usedBy: FieldValue.increment(1)
        })
      }
    } else {
      const oldDocument = change.before.data()

      return db.doc(`menuCategories/${oldDocument.category.id}`).update({
        usedBy: FieldValue.increment(-1)
      })
    }

    return null
  })

exports = module.exports = menuItemsWrite
