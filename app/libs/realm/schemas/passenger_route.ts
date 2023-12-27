import Realm, { ObjectSchema } from "realm";
import { User } from "./user";
import { Ride } from "./ride";

type GenerateProps = {
  passenger: User;
  ride: Ride;
  ended_at: string;
  ending_location: string;
  ending_time: string;
  minutes_taken: number;
  started_at: string;
  starting_location: string;
  starting_time: string;
};

export class PassengerRoute extends Realm.Object {
  _id!: string;
  passenger!: User;
  ride!: Ride;
  ended_at?: string;
  ending_location!: string;
  ending_time!: string;
  minutes_taken?: number;
  started_at?: string;
  starting_location!: string;
  starting_time!: string;
  created_at!: string;
  updated_at!: string;

  static schema: ObjectSchema = {
    primaryKey: "_id",
    name: "PassengerRoute",
    properties: {
      _id: "uuid",
      passenger: "User",
      ride: "Ride",
      ended_at: "string",
      ending_location: "string",
      ending_time: "date",
      minutes_taken: "int",
      started_at: "date",
      starting_location: "string",
      starting_time: "date",
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
