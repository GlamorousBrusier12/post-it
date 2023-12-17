import { Options } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Posts";
import path from "path";
// import { MikroORM } from "@mikro-orm/postgresql";

export const config: Options = {
  entities: [Post],
  dbName: "lireddit",
  type: "postgresql",
  debug: !__prod__,
  allowGlobalContext: true,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
};

export default config;
