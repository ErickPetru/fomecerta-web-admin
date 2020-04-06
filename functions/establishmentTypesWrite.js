const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()

const establishmentTypesWrite = functions.region('us-east4')
  .firestore.document('establishmentTypes/{id}').onWrite((change, context) => {
    const { id } = context.params

    if (change.before.exists && change.after.exists) { // Updating
      const name = change.after.get('name')

      return db
        .collectionGroup('establishmentTypes')
        .where('id', '==', id)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return null
          } else {
            const batch = db.batch()

            snapshot.forEach((doc) => {
              batch.update(doc.ref, { name })
            })

            return batch.commit()
          }
        })
    }

    return null
  })

exports = module.exports = establishmentTypesWrite
