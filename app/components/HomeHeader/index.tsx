import { Container, Greeting, Message, Name, Picture, Tag } from "./styles";
import { Power } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import theme from "@/themes";

import { useUser, useApp } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function HomeHeader() {
  const realmUser = useUser();
  const app = useApp();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  function handleLogout() {
    app.currentUser?.logOut();
  }

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: realmUser?.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá,</Message>
        <Name>{realmUser.profile.name}!</Name>
      </Greeting>
      <Tag>Motorista</Tag>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}