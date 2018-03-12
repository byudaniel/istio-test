const find_ip = require('get-ip-address')

/*const node = require('sneeze')({
  isbase: false,
  host: find_ip(),
  port: 39999,
  bases: ['172.17.0.15:39999'],
  silent: false
})
node.on('add', console.log)
node.on('remove', console.log)
node.join()
console.log('join called')*/

const Seneca = require('seneca')

console.log('***ip', find_ip())

Seneca()
  .use('mesh', {
    bases: ['172.17.0.13:39999'],
    isbase: false,
    host: find_ip(),
    port: 39999,
    sneeze: { silent: false },
    listen: [
      {
        pin: 'role:echo',
        host: '0.0.0.0',
        port: 40000
      }
    ]
  })
  .add('role:echo,cmd:execute', function(msg, done) {
    console.log('***msg', msg)
    done(null, { ok: true, value: 'hi' })
  })

/* const Api = require('kubernetes-client')
const core = new Api.Core({
  url: 'http://10.96.0.1',
  version: 'v1'
})

function print(err, result) {
  console.log(JSON.stringify(err || result, null, 2))
}

core
  .namespaces('default')
  .services('sneeze-base')
  .get(print) */

/* const k8s = require('@kubernetes/client-node')
const k8sApi = k8s.Config.defaultClient()
k8sApi.listNamespacedPod('default').then(res => console.log(res.body))
*/

const Hapi = require('hapi')

const server = Hapi.server({
  host: '0.0.0.0',
  port: 40001
})

server.route({
  method: 'GET',
  path: '/hello',
  handler: function(request, h) {
    return 'hi'
  }
})

server.route({
  method: 'POST',
  path: '/yo',
  handler: function(request, h) {
    return 'yolo'
  }
})

// Start the server
async function start() {
  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.uri)
}

start()
