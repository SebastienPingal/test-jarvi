import { NhostClient } from '@nhost/nhost-js'

export const nhost = new NhostClient({
  subdomain: 'tyqgkgkdlmbpvvxdksfc', region: 'eu-central-1',
})

nhost.auth.signIn({
  email: 'quentin@jarvi.tech', password: 'mYAW9QVdMKZenfbA'
})
