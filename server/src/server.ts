import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";

const app = Fastify();



app.register(cors)
app.register(appRoutes)

app.listen({
    host : '192.168.0.67',
    port: 5454
}).then(_ => console.log("Server Running at 192.168.0.67:5454"))