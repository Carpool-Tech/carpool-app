import Realm, { ObjectSchema } from "realm";

type GenerateProps = {
  bio: string;
  date_of_birth: string;
  email: string;
  is_driver: boolean;
  name: string;
  ranking: number;
  rides_given: number;
  rides_taken: number;
};

export class User extends Realm.Object {
  _id!: string;
  bio!: string;
  date_of_birth!: string;
  email!: string;
  is_driver!: boolean;
  name!: string;
  ranking!: number;
  rides_given!: number;
  rides_taken!: number;
  created_at!: string;
  updated_at!: string;

  static schema: ObjectSchema = {
    primaryKey: "_id",
    name: "User",
    properties: {
      _id: "uuid",
      bio: "string",
      date_of_birth: "date",
      email: "string",
      is_driver: { type: "bool", default: false },
      name: "string",
      ranking: { type: "float", default: 0 },
      rides_given: { type: "int", default: 0 },
      rides_taken: { type: "int", default: 0 },
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
