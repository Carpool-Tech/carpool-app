import { createRealmContext } from "@realm/react";

import { Historic } from "./schemas/historic";
import { User } from "./schemas/user";

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Historic, User],
  });
