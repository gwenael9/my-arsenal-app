import { buildSchema } from "type-graphql";

import UserResolver from "./resolvers/user.resolver";
import PlayerResolver from "./resolvers/player.resolver";
import GoalResolver from "./resolvers/goal.resolver";
import { customAuthChecker } from "./lib/authChecker";

export default buildSchema({
  resolvers: [PlayerResolver, GoalResolver, UserResolver],
  validate: false,
  authChecker: customAuthChecker,
});
