import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Loading } from "./styles";

import { CarStatus } from "@/components/CarStatus";
import { HomeHeader } from "@/components/HomeHeader";
import { useQuery, useRealm, useUser } from "@realm/react";
import Realm from "realm";
import { Historic } from "@/libs/realm/schemas/historic";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "app/libs/realm/schemas/user";
import { Button } from "app/components/Button";

export function Home() {
  const [currentVehicle, setCurrentVehicle] = useState<Historic | null>(null);
  const [actualUser, setActualUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const historic = useQuery(Historic);
  const navigation = useNavigation;
  function handleRegisterMovement() {
    navigation("/app/screens/home");
  }

  const realm = useRealm();
  const user = useUser();
  const [userData] = useQuery(User, (users) =>
    users.filtered("email == $0", user.profile.email),
  );

  function createUser() {
    realm.write(() => {
      realm.create("User", {
        name: user.profile.name,
        email: user.profile.email,
        _id: new Realm.BSON.UUID(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
  }

  async function checkUserIsRegistered() {
    try {
      let jsonValue = await AsyncStorage.getItem("isUserRegistered");
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (!jsonValue) {
        if (!userData) {
          createUser();
        }
        await AsyncStorage.setItem("isUserRegistered", "true");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao checar usuário.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setActualUser(userData);
    checkUserIsRegistered();
    console.log(actualUser);
    console.log(userData);
  }, [isLoading]);

  const fetchVehicle = () => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setCurrentVehicle(vehicle);
    } catch (error) {
      Alert.alert("Erro", "Erro ao tentar buscar o veiculo em uso.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);
  let n = 0;
  return isLoading ? (
    <Loading>"Loading"</Loading>
  ) : (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus
          licensePlate={currentVehicle?.license_plate}
          onPress={handleRegisterMovement}
        />
        <Button
          title="console.log()"
          onPress={() => console.log(n++, userData)}
        />
      </Content>
    </Container>
  );
}
