const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue

const menuCategoriesWrite = functions.region('us-east4')
  .firestore.document('menuCategories/{id}').onWrite((change, context) => {
    const { id } = context.params

    if (!change.before.exists) { // Creating
      const doc = change.after.data()

      return db.doc(`establishments/${doc.uid}`).set({
        sizes: {
          menuCategories: FieldValue.increment(1)
        }
      }, {
        merge: true
      })

    } else if (change.before.exists && change.after.exists) { // Updating
      const name = change.after.get('name')

      return db
        .collection('menuItems')
        .where('category.id', '==', id)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return null
          } else {
            const batch = db.batch()

            snapshot.forEach((doc) => {
              batch.update(doc.ref, { 'category.name': name })
            })

            return batch.commit()
          }
        })

    } else if (!change.after.exists) { // Deleting
      const doc = change.before.data()

      return db.doc(`establishments/${doc.uid}`).set({
        sizes: {
          menuCategories: FieldValue.increment(-1)
        }
      }, {
        merge: true
      })
    }

    return null
  })

exports = module.exports = menuCategoriesWrite
