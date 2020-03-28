const functions = require('firebase-functions')
const { Nuxt } = require('nuxt-start')
const express = require('express')

const config = require('./nuxt.config.js')
const nuxt = new Nuxt({
  ...config,
  dev: false,
  debug: false,
  buildDir: 'nuxt',
})

let isReady = false
const readyPromise = nuxt.ready().then(() => (isReady = true)).catch(() => process.exit(1))

async function handleRequest (req, res) {
  if (!isReady) await readyPromise
  // res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
  res.setHeader('Cache-Control', 'private')
  await nuxt.render(req, res)
}

const app = express()
app.get('*', handleRequest)
app.use(handleRequest)

exports.nuxtssr = functions.https.onRequest(app)
