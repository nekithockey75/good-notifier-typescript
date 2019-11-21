// src/index.ts

import "reflect-metadata";

import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import ItemResolver from "./resolvers/ItemResolver";
import ListResolver from "./resolvers/ListResolver";
import { createConnection } from "typeorm";

// TODO: add DELETE

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [UserResolver, ItemResolver, ListResolver],
        emitSchemaFile: true,
    });

    const server = new GraphQLServer({
        schema,
    });

    createConnection().then(conn => {
        // fetch user and return it or return empty object
    }).catch(err => {
        // return connection error
        console.log(err);
    });
    server.start(() => console.log("Server is running on http://localhost:4000"));
}

bootstrap();