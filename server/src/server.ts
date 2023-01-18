import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";

const app = Fastify();



app.register(cors)
app.register(appRoutes)

app.listen({
    port: 5454
}).then(_ => console.log("Server Running at localhost:5454"))