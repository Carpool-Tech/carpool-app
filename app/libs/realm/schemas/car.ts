import Realm, { ObjectSchema } from "realm";
import { User } from "./user";

type GenerateProps = {
  brand: string;
  fuel_type: FuelTypes;
  last_maintenance: string;
  model: string;
  owner: User;
  plate: string;
  seats: number;
  year_of_making: number;
};

enum FuelTypes {
  diesel,
  electric,
  ethanol,
  gas,
  gasoline,
}

export class Car extends Realm.Object {
  _id!: string;
  brand!: string;
  fuel_type!: FuelTypes;
  last_maintenance!: string;
  model!: string;
  owner!: User;
  plate!: string;
  seats!: number;
  year_of_making!: number;
  created_at!: string;
  updated_at!: string;

  static schema: ObjectSchema = {
    primaryKey: "_id",
    name: "Car",
    properties: {
      _id: "uuid",
      brand: "string",
      fuel_type: "string",
      last_maintenance: "date",
      model: "string",
      owner: "User",
      plate: "string",
      seats: { type: "int", default: 5 },
      year_of_making: "int",
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
