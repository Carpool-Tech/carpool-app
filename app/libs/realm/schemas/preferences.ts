import Realm, { ObjectSchema } from "realm";

type GenerateProps = {
  is_chatter: boolean;
  is_pet_friendly: boolean;
  is_smoking_allowed: boolean;
  plays_music: boolean;
};

export class Preferences extends Realm.Object {
  is_chatter!: boolean;
  is_pet_friendly!: boolean;
  is_smoking_allowed!: boolean;
  plays_music!: boolean;

  static schema: ObjectSchema = {
    name: "Preferences",
    embedded: true,
    properties: {
      is_chatter: { type: "bool", default: false },
      is_pet_friendly: { type: "bool", default: false },
      is_smoking_allowed: { type: "bool", default: false },
      plays_music: { type: "bool", default: false },
    },
  };

  static generate(props: GenerateProps) {
    return props;
  }
}
