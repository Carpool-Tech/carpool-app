import Realm, { ObjectSchema } from "realm";
import { Car } from "./car";
import { User } from "./user";

type GenerateProps = {
  car: Car;
  driver: User;
  ended_at: string;
  ending_location: string;
  ending_time: string;
  minutes_taken: number;
  started_at: string;
  starting_location: string;
  starting_time: string;
};

export class Ride extends Realm.Object {
  _id!: string;
  car!: Car;
  driver!: User;
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
    name: "Ride",
    properties: {
      _id: "uuid",
      car: "Car",
      driver: "User",
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
