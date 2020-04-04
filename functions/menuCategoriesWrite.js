const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()

const menuCategoriesWrite = functions.region('us-east4')
  .firestore.document('menuCategories/{id}').onWrite((change, context) => {
    if (change.before.exists && change.after.exists) {
      const { id } = context.params
      const document = change.after.data()

      return db
        .collection('menuItems')
        .where('category.id', '==', id)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return null
          } else {
            const batch = db.batch()

            snapshot.forEach(doc => {
              batch.update(doc.ref, { 'category.name': document.name })
            })

            return batch.commit()
          }
        })
    }

    return null
  })

exports = module.exports = menuCategoriesWrite
