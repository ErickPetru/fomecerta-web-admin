const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue

const establishmentsWrite = functions.region('us-east4')
  .firestore.document('establishments/{id}').onWrite((change, context) => {
    if (!change.before.exists) { // Creating
      const doc = change.after.data()

      return db
        .collection('establishmentTypes')
        .where('id', 'IN', doc.establishmentTypes.map((item) => item.id))
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return null
          } else {
            const batch = db.batch()

            snapshot.forEach((doc) => {
              batch.update(doc.ref, { usedBy: FieldValue.increment(1) })
            })

            return batch.commit()
          }
        })

    } else if (change.before.exists && change.after.exists) { // Updating
      const oldDoc = change.before.data()
      const doc = change.after.data()

      return Promise.all([
        db.collection('establishmentTypes')
          .where('id', 'IN', oldDoc.establishmentTypes.map((item) => item.id))
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              return null
            } else {
              const batch = db.batch()

              snapshot.forEach((doc) => {
                batch.update(doc.ref, { usedBy: FieldValue.increment(-1) })
              })

              return batch.commit()
            }
          }),

        db.collection('establishmentTypes')
          .where('id', 'IN', doc.establishmentTypes.map((item) => item.id))
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              return null
            } else {
              const batch = db.batch()

              snapshot.forEach((doc) => {
                batch.update(doc.ref, { usedBy: FieldValue.increment(1) })
              })

              return batch.commit()
            }
          })
      ])

    } else if (!change.after.exists) { // Deleting
      const doc = change.before.data()

      return db
        .collection('establishmentTypes')
        .where('id', 'IN', doc.establishmentTypes.map((item) => item.id))
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return null
          } else {
            const batch = db.batch()

            snapshot.forEach((doc) => {
              batch.update(doc.ref, { usedBy: FieldValue.increment(-1) })
            })

            return batch.commit()
          }
        })
    }

    return null
  })

exports = module.exports = establishmentsWrite
