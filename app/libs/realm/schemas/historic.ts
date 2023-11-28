import Realm, { ObjectSchema } from "realm";

type GenerateProps = {
  user_id: string;
  description: string;
  license_plate: string;
};

export class Historic extends Realm.Object {
  static schema: ObjectSchema = {
    name: "Historic",
    primaryKey: "_id",
    properties: {
      _id: "uuid",
      user_id: {
        type: "string",
        indexed: true,
      },
      license_plate: "string",
      description: "string",
      status: "string",
      created_at: "date",
      updated_at: "date",
    },
  };

  _id!: string;
  user_id!: string;
  license_plate!: string;
  description!: string;
  status!: string;
  created_at!: string;
  updated_at!: string;

  static generate({ user_id, description, license_plate }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      description,
      license_plate,
      status: "departure",
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
