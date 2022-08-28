import 'reflect-metadata'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { ConfigService } from './config/vars/configService'
import { TYPES } from './config/ioc/types'
import helmet from 'helmet'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import './config/ioc/loader'
import dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}
const config = new ConfigService()
const configErr = config.load()
if (configErr) throw new Error(configErr)

let container = new Container()
container.bind<any>(TYPES.IConfig).toConstantValue(config)

const httpPort = config.getVars().server.port
const httpRootPath = config.getVars().server.rootPath

let server = new InversifyExpressServer(container, null, {
  rootPath: httpRootPath,
})
server.setConfig(app => {
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
})

const app = server.build()
app.listen(httpPort, () => {
  console.info(`Servidor iniciado:  http://localhost:${httpPort}`)
})

exports = module.exports = app
