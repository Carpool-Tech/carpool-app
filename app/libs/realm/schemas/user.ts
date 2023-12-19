import Realm, { ObjectSchema } from "realm";

type GenerateProps = {
  name: string;
  email: string;
};

export class User extends Realm.Object {
  static schema: ObjectSchema = {
    primaryKey: "_id",
    name: "User",
    properties: {
      _id: "uuid",
      email: "string",
      name: "string",
      created_at: "date",
      updated_at: "date",
    },
  };

  _id!: string;
  created_at!: string;
  updated_at!: string;
  name!: string;
  email!: string;

  static generate({ name, email }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
