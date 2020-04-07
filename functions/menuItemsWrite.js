const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue

const menuItemsWrite = functions.region('us-east4')
  .firestore.document('menuItems/{id}').onWrite((change) => {
    if (!change.before.exists) { // Creating
      const doc = change.after.data()

      return Promise.all([
        db.doc(`establishments/${doc.uid}`).set({
          sizes: {
            menuItems: FieldValue.increment(1)
          }
        }, {
          merge: true
        }),

        db.doc(`menuCategories/${doc.category.id}`).set({
          usedBy: FieldValue.increment(1)
        }, {
          merge: true
        })
      ])

    } else if (change.before.exists && change.after.exists) { // Updating
      const oldDoc = change.before.data()
      const doc = change.after.data()

      if (oldDoc.category.id !== doc.category.id) {
        return Promise.all([
          db.doc(`menuCategories/${oldDoc.category.id}`).set({
            usedBy: FieldValue.increment(-1)
          }, {
            merge: true
          }),

          db.doc(`menuCategories/${doc.category.id}`).set({
            usedBy: FieldValue.increment(1)
          }, {
            merge: true
          })
        ])
      }

    } else if (!change.after.exists) { // Deleting
      const doc = change.before.data()

      return Promise.all([
        db.doc(`establishments/${doc.uid}`).set({
          sizes: {
            menuItems: FieldValue.increment(-1)
          }
        }, {
          merge: true
        }),

        db.doc(`menuCategories/${doc.category.id}`).set({
          usedBy: FieldValue.increment(-1)
        }, {
          merge: true
        })
      ])
    }

    return null
  })

exports = module.exports = menuItemsWrite
