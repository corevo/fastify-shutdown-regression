import {promisify as p} from 'node:util'
import fastify from 'fastify'
import got from 'got'

const psetTimeout = p(setTimeout)

const app = fastify()

app.get('/delay', async () => {
  await psetTimeout(1000)

  return 'OK'
})

const address = await app.listen({port: 0, host: '0.0.0.0'})

const r = got(`${address}/delay`).text()
await psetTimeout(100)

await app.close()

console.log(await r)
