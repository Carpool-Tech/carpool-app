import React, { forwardRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";
import { useTheme } from "styled-components";

type Props = TextInputProps & {
    label: string;
};

export const LicensePlateInput = forwardRef<TextInput, Props>(
    ({ label, onChangeText, ...rest }, ref) => {
        const { COLORS } = useTheme();
        const [isValid, setIsValid] = useState(true);
        const brasilLicensePlateRegex = new RegExp(
            "^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$"
        );

        const handleValidation = (text: string) => {
            const result = brasilLicensePlateRegex.test(text);
            setIsValid(result);

            if (onChangeText) {
                onChangeText(text);
            }
        };

        return (
            <Container>
                <Label>{label}</Label>
                <Input
                    ref={ref}
                    maxLength={7}
                    autoCapitalize="characters"
                    placeholderTextColor={COLORS.GRAY_400}
                    onChangeText={handleValidation}
                    style={{
                        borderColor: isValid ? COLORS.GRAY_400 : "red",
                        borderWidth: isValid ? 0 : 2,
                    }}
                    {...rest}
                />
            </Container>
        );
    }
);