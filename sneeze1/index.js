const find_ip = require('get-ip-address')

/*const base = require('sneeze')({
  isbase: true,
  host: find_ip(),
  port: 39999,
  silent: false
})
base.join()*/

const Seneca = require('seneca')

Seneca().use('mesh', {
  isbase: true,
  host: find_ip(),
  port: 39999,
  sneeze: { silent: false }
})
