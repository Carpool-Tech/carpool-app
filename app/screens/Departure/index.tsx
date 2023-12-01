import { useNavigation } from "@react-navigation/native";
import { useUser } from "@realm/react";
import {
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords,
} from "expo-location";
import { CarSimple } from "phosphor-react-native";
import React from "react";
import {
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useTheme } from "styled-components";

import { Container, Content, Message } from "./styles";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { LicensePlateInput } from "@/components/LicensePlateInput";
import { Loading } from "@/components/Loading";
import { LocationInfo } from "@/components/LocationInfo";
import { Map } from "@/components/Map";
import { TextAreaInput } from "@/components/TextAreaInput";
import { useRealm } from "@/libs/realm";
import { Historic } from "@/libs/realm/schemas/historic";
import { getAddressLocation } from "@/utils/getAddressLocation";
import { licensePlateValidate } from "@/utils/licensePlateValidate";

export function Departure() {
  const { COLORS } = useTheme();
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true);
  const [licensePlate, setLicensePlate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(true);
  const [currentAddress, setCurrentAddress] = React.useState<string | null>(
    null,
  );
  const [currentCoords, setCurrentCoords] =
    React.useState<LocationObjectCoords | null>(null);
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

  React.useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  React.useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }

    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoords(location.coords);
        getAddressLocation(location.coords)
          .then((address: string | null | undefined) => {
            if (address) {
              setCurrentAddress(address);
            }
          })
          .finally(() => setIsLoadingLocation(false));
      },
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission?.granted]);

  const realm = useRealm();
  const user = useUser();
  const { goBack } = useNavigation();

  const licensePlateRef = React.useRef<TextInput>(null);
  const descriptionRef = React.useRef<TextInput>(null);

  const handleDepartureRegister = () => {
    try {
      console.log("Starting Registration: ", licensePlate);
      if (!licensePlateValidate(licensePlate)) {
        setIsValid(false);
        licensePlateRef.current?.focus();
        return Alert.alert(
          "Placa inválida",
          "A placa inserida é inválida, por favor informe a placa correta.",
        );
      } else {
        setIsValid(true);
        setIsRegistering(true);
        realm.write(() => {
          realm.create(
            "Historic",
            Historic.generate({
              user_id: user!.id,
              license_plate: licensePlate.toUpperCase(),
              description,
            }),
          );
        });
        Alert.alert("Saída", "Saída do veículo registrada com sucesso");
        goBack();
      }
    } catch (err) {
      setIsRegistering(false);
      console.error("Error in handleDepartureRegister: ", err);
      Alert.alert("Erro", "Não foi possível regristrar a saída do veículo.");
    }
  };

  const keyboardAvoidingViewBehavior =
    Platform.OS === "android" ? "height" : "position";

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          acessar essa funcionalidade. Por favor, acesse as configurações do seu
          dispositivo para conceder a permissão ao aplicativo.
        </Message>
      </Container>
    );
  }

  if (isLoadingLocation) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title="Saída" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingViewBehavior}
      >
        <ScrollView>
          {currentCoords && <Map coordinates={[currentCoords]} />}
          <Content>
            {currentAddress && (
              <LocationInfo
                icon={CarSimple}
                label="Localização atual"
                description={currentAddress}
              />
            )}
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
              returnKeyType="next"
              onChangeText={(text) => {
                console.log("Setting license plate: ", text);
                setLicensePlate(text);
              }}
              style={{
                borderColor: isValid ? COLORS.GRAY_400 : COLORS.RED,
                borderWidth: isValid ? 0 : 2,
              }}
            />
            <TextAreaInput
              ref={descriptionRef}
              label="Finalizade"
              placeholder="Vou utilizar o veículo para..."
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />
            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
