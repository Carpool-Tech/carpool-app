import Realm, { ObjectSchema } from "realm";

type GenerateProps = {
  is_chatter: PreferencesValues;
  is_pet_friendly: PreferencesValues;
  is_smoking_allowed: PreferencesValues;
  plays_music: PreferencesValues;
};

enum PreferencesValues {
  maybe,
  no,
  yes,
}

export class Preferences extends Realm.Object {
  is_chatter!: PreferencesValues;
  is_pet_friendly!: PreferencesValues;
  is_smoking_allowed!: PreferencesValues;
  plays_music!: PreferencesValues;

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
