// tslint:disable-next-line: no-var-requires
require('module-alias/register')
import dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}
import 'reflect-metadata'

import { ConfigService } from './config/vars/configService'
const config = new ConfigService()
const configErr = config.load()
if (configErr) throw new Error(configErr)

import * as bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './config/ioc/inversify.config'

// import { Container } from 'inversify'
import { TYPES } from './config/ioc/types'

const httpPort = config.getVars().server.port
const httpRootPath = config.getVars().server.rootPath
// tslint:disable-next-line: no-console
console.log('Api iniciando...');

import './config/ioc/loader'



// const container = new Container()



container.bind<any>(TYPES.IConfig).toConstantValue(config)
const server = new InversifyExpressServer(container, null, {
  rootPath: httpRootPath,
})
server.setConfig( (appp:any) => {
  appp.use(bodyParser.json())
  appp.use(helmet())
  appp.use(cors())
})

const app = server.build()
app.listen(httpPort, () => {
  // tslint:disable-next-line: no-console
  console.info(`Servidor iniciado:  http://localhost:${httpPort}`)
})

exports = module.exports = app
