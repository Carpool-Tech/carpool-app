import Realm, { ObjectSchema } from "realm";
import { User } from "./user";
import { Ride } from "./ride";

type GenerateProps = {
  tipper: User;
  ride: Ride;
  amount: number;
};

export class Tipping extends Realm.Object {
  _id!: string;
  tipper!: User;
  ride!: Ride;
  amount!: number;
  created_at!: string;
  updated_at!: string;

  static schema: ObjectSchema = {
    primaryKey: "_id",
    name: "Tipping",
    properties: {
      _id: "uuid",
      tipper: "User",
      ride: "Ride",
      amount: "float",
      created_at: "date",
      updated_at: "date",
    },
  };

  static generate(props: GenerateProps) {
    return {
      ...props,
      _id: new Realm.BSON.UUID(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
