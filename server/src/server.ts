import Fastify from 'fastify'
import cors from "@fastify/cors"
import { prisma } from './lib/prisma'
import {appRoutes} from './routes'

const app= Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
    port:3333,
}).then((port)=>{
    console.log(`HTTP Server running! The port ${port}`)
})