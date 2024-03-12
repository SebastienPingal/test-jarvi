const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'tyqgkgkdlmbpvvxdksfc.db.eu-central-1.nhost.run',
  database: 'tyqgkgkdlmbpvvxdksfc',
  password: 'mHHJJczN21jpDyEr',
  port: '5432',
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
    client.end()
  }
})