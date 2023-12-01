import { createRealmContext } from "@realm/react";

import { Historic } from "./schemas/historic";

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Historic],
  });
