import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { Container, Content } from "./styles";

import { CarStatus } from "@/components/CarStatus";
import { HomeHeader } from "@/components/HomeHeader";
import { useQuery } from "@realm/react";

import { Historic } from "@/libs/realm/schemas/historic";
import "react-native-gesture-handler";

export function Home() {
  const [currentVehicle, setCurrentVehicle] = useState<Historic | null>(null);
  const historic = useQuery(Historic);
  const navigation = useNavigation;
  function handleRegisterMovement() {
    navigation("/app/screens/home");
  }

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

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus
          licensePlate={currentVehicle?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}
