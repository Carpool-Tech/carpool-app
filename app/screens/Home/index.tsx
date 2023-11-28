import { Historic } from "@/libs/realm/schemas/historic";
import { HomeHeader } from "@/components/HomeHeader";
import { CarStatus } from "@/components/CarStatus";
import { Container, Content } from "./styles";
import { useEffect, useState } from "react";
import { useQuery } from "@/libs/realm";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import 'react-native-gesture-handler';

export function Home() {
    const [currentVehicle, setCurrentVehicle] = useState<Historic | null>(null);
    const historic = useQuery(Historic);
    function handleRegisterMovement() {
        useNavigation('/app/screens/home')
    }

    const fetchVehicle = () => {
        try {
            const vehicle = historic.filtered("status = 'departure'")[0];
            console.log("Veiculo em uso: " + historic);
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