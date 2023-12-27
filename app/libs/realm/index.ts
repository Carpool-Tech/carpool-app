import { createRealmContext } from "@realm/react";

import { Car } from "./schemas/car";
import { Historic } from "./schemas/historic";
import { PassengerRoute } from "./schemas/passenger_route";
import { Preferences } from "./schemas/preferences";
import { Tipping } from "./schemas/tipping";
import { User } from "./schemas/user";
import { Ride } from "./schemas/ride";

export const schemas = [Car, Historic, PassengerRoute, Preferences, Ride, Tipping, User]

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: schemas,
  });
