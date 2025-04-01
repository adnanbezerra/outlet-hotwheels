import { useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

class Message {
    id: number;
    text: string;
    sentBy: string;
    constructor(text: string, sentBy: string) {
        this.id = Math.random();
        this.text = text;
        this.sentBy = sentBy;
    }
}

export default function Chat() {
    const scrollRef = useRef<FlatList>(null);
    const [chat, setChat] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [userData, setUserData] = useState("USER");
    const params = useLocalSearchParams();

    const ws = new WebSocket("ws://10.5.7.35:3000");

    useEffect(() => {
        setUserData(params.name as string);

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = (message) => {
            console.log(message);

            const msg = JSON.parse(message.data);
            chat.push(new Message(msg.text, userData));

            console.log("Received message:", msg.text);

            setChat([...chat]);

            scrollRef.current?.scrollToEnd({ animated: true });
        };
    }, [params]);

    ws.onclose = () => {
        console.log("Disconnected from WebSocket server");
    };

    const sendMessage = () => {
        const newMessage = new Message(text, userData);
        setChat([...chat, newMessage]);
        setText("");

        ws.send(JSON.stringify(newMessage));
    };

    return (
        <Fragment>
            <FlatList
                ref={scrollRef}
                data={chat}
                renderItem={({ item }) => (
                    <Text>
                        {item.text} - {item.sentBy}
                    </Text>
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={{ alignSelf: "center", color: "#848484" }}>
                        Nenhum chat
                    </Text>
                }
            />
            <View style={style.inputContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Digite sua mensagem"
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity
                    onPress={sendMessage}
                    style={style.sendButton}
                >
                    <Text style={{ color: "#fff" }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </Fragment>
    );
}

const style = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#848484",
        paddingHorizontal: 10,
        width: "80%",
        marginRight: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
    },
    sendButton: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CE3E2F",
        borderRadius: 5,
        height: 40,
    },
});
