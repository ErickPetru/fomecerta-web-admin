const functions = require('firebase-functions')
const admin = require('firebase-admin')

if (!admin.apps.length) admin.initializeApp()

const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue
const FieldPath = admin.firestore.FieldPath

const establishmentsWrite = functions.region('us-east4')
  .firestore.document('establishments/{id}').onWrite((change, context) => {
    if (!change.before.exists) { // Creating
      const doc = change.after.data()
      if (!doc.typesOfEstablishment || !doc.typesOfEstablishment.length) {
        return null
      }

      return db
        .collection('establishmentTypes')
        .where(FieldPath.documentId(), 'in', doc.typesOfEstablishment.map((item) => item.id))
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
        !oldDoc.typesOfEstablishment || !oldDoc.typesOfEstablishment.length ? null :
          db.collection('establishmentTypes')
            .where(FieldPath.documentId(), 'in', oldDoc.typesOfEstablishment.map((item) => item.id))
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

        !doc.typesOfEstablishment || !doc.typesOfEstablishment.length ? null :
          db.collection('establishmentTypes')
            .where(FieldPath.documentId(), 'in', doc.typesOfEstablishment.map((item) => item.id))
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
      const oldDoc = change.before.data()
      if (!oldDoc.typesOfEstablishment || !oldDoc.typesOfEstablishment.length) {
        return null
      }

      return db
        .collection('establishmentTypes')
        .where(FieldPath.documentId(), 'in', oldDoc.typesOfEstablishment.map((item) => item.id))
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
