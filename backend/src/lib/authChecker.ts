import { AuthChecker } from "type-graphql";

import { MyContext } from "..";

export const customAuthChecker: AuthChecker<MyContext> = (
  { context },
  roles
) => {
  if (context.user && roles.includes(context.user.role)) {
    return true;
  }
  return false;
};
