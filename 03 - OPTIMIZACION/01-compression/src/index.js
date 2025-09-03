import serverCompress from './servers/server-compress.js'
import serverNormal from './servers/server.js'

serverNormal.listen(3000, ()=>console.log('server normal, puerto 3000'))
serverCompress.listen(3001, ()=>console.log('server compress, puerto 3001'))