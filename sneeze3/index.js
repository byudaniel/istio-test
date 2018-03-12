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

Seneca()
  .use(require('./mesh'), {
    bases: ['172.17.0.13:39999'],
    isbase: false,
    host: find_ip(),
    port: 39999,
    sneeze: { silent: false }
  })
  .ready(function() {
    const seneca = this

    function sendMessage() {
      seneca.act('role:echo,cmd:execute', function(err, result) {
        if (err) {
          return console.error('***err', err)
        }

        console.log('***result', result)
      })
    }

    setInterval(sendMessage, 10000)
  })

/* const axios = require('axios')

async function sendMessage2() {
  try {
    const response = await axios.get('http://echo-service:50000')
    console.log('***sendMessage', response.data)
  } catch (err) {
    console.log('***sendMessage error', err)
  }
}

setInterval(sendMessage2, 5000) */

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

const Wreck = require('wreck')

async function sendAct() {
  try {
    const { res, payload } = await Wreck.post(
      'http://sneeze-client-service.default.svc.cluster.local:40001/yo'
    )
    console.log('***wreck post payload', payload)
  } catch (err) {
    console.log('***wreck post err', err)
  }

  try {
    const { res, payload } = await Wreck.get(
      'http://sneeze-client-service.default.svc.cluster.local:40001/hello'
    )
    console.log('***wreck payload', payload)
  } catch (err) {
    console.log('***wreck err', err)
  }
}

setInterval(sendAct, 5000)
