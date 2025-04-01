import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChangeName() {
    const router = useRouter();
    const [usename, setUsername] = useState("");

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <TextInput
                placeholder="Digite seu nome"
                style={styles.textInput}
                value={usename}
                placeholderTextColor={"black"}
                onChangeText={(text) => setUsername(text)}
            />
            <TouchableOpacity
                style={styles.button}
                disabled={usename.trim() === ""}
                onPress={() =>
                    router.replace({
                        pathname: "/(tabs)/chat",
                        params: { name: usename.trim() },
                    })
                }
            >
                <Text>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#848484",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CE3E2F",
        borderRadius: 5,
        height: 40,
    },
});
