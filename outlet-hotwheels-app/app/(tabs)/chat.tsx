import { useUser } from "@/components/UserContext";
import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const [isLoading, setIsLoading] = useState(false);
    const params = useLocalSearchParams();

    const { user } = useUser();

    const sendMessage = async () => {
        if (!text.trim()) return;

        const newMessage = new Message(text, user?._id ?? "");
        setChat(prev => [...prev, newMessage]);
        setText("");
        
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("token");

            const response = await fetch(`${API_URL}/ai/long-context`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ prompt: newMessage.text }),
            });

            const data = await response.json();
            const chatResponse = new Message(data.text, "AI");
            setChat(prev => [...prev, chatResponse]);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [chat]);

    const renderMessage = ({ item }: { item: Message }) => (
        <View 
            style={[
                styles.messageContainer,
                item.sentBy === "AI" ? styles.aiMessage : styles.userMessage
            ]}
        >
            <Text style={styles.messageSentBy}>{item.sentBy === "AI" ? "AI" : "Você"}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <Fragment>
            <FlatList
                ref={scrollRef}
                data={chat}
                contentContainerStyle={chat.length === 0 ? { flex: 1 } : { paddingVertical: 10 }}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 24,
                            }}
                        >
                            Nenhum chat
                        </Text>
                        <Text
                            style={{
                                color: "#848484",
                                fontSize: 16,
                                marginTop: 8,
                            }}
                        >
                            Envie uma mensagem para começar a conversa sobre o
                            Outlet
                        </Text>
                    </View>
                }
            />
            <View style={style.inputContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Digite sua mensagem"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={sendMessage}
                />
                <TouchableOpacity
                    onPress={sendMessage}
                    style={[
                        style.sendButton,
                        isLoading && { opacity: 0.7 }
                    ]}
                    disabled={isLoading}
                >
                    <Text style={{ color: "#fff" }}>
                        {isLoading ? "Enviando..." : "Enviar"}
                    </Text>
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
    messageSentBy: {
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 5,
    }
});

const styles = StyleSheet.create({
    ...style,
    messageContainer: {
        maxWidth: '80%',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#CE3E2F',
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E8E8E8',
    },
    messageText: {
        color: '#000',
        fontSize: 16,
    }
});
