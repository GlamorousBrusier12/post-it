// import { MikroORM } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";

const port = process.env.PORT || 4000;
const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  // start the migrations
  await orm.getMigrator().up();

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  const app: Application = express();

  await apollo.start();

  apollo.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`server is started on port ${port}....`);
  });
};

main().catch((err) => {
  console.log("err:::", err);
});
