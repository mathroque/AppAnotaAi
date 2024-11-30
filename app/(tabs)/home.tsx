import { StyleSheet, Text, View, TextInput, ScrollView, Image } from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { ListContext } from "../context/list-context";
import { images } from "@/constants";

type buttonProps = {
    title: string;
    containerStyles: string;
    textStyles: string;
};

const Home = () => {
    const { listContext, setListContext } = useContext(ListContext);
    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [buttonTitle, setButtonTitle] = useState<buttonProps>({
        title: "Adicionar",
        containerStyles: "my-2",
        textStyles: "",
    });
    const onAddItem = () => {
        setListContext([...listContext, { name: name, value: Number(value) }]);
        setName("");
        setValue("");
        setButtonTitle({
            title: "Item adicionado!",
            containerStyles: "bg-secondary-200 my-2",
            textStyles: "text-white",
        });
        setTimeout(() => {
            setButtonTitle({ title: "Adicionar", containerStyles: "my-2", textStyles: "" });
        }, 1500);
    };

    return (
        <ScrollView className="bg-primary h-full">
            <View style={styles.imageContainer} className="py-10">
                <Image source={images.logo} className="h-[300px]" resizeMode="contain" />
            </View>
            <View className="p-4" style={styles.container}>
                <Text className="text-2xl text-white font-bold">Adicionar itens +</Text>
                <View style={{ marginVertical: 10 }}>
                    <TextInput
                        style={styles.basicInput}
                        placeholder="Nome"
                        onChangeText={(text) => setName(text)}
                        className="text-primary bg-white p-2 shadow"
                        value={name}
                    />
                    <TextInput
                        style={styles.basicInput}
                        placeholder="Valor"
                        onChangeText={(text) => setValue(text)}
                        className="text-primary bg-white p-2 shadow"
                        value={value}
                    />
                </View>
                <CustomButton
                    title={buttonTitle.title}
                    handlePress={onAddItem}
                    containerStyles={buttonTitle.containerStyles}
                    textStyles={buttonTitle.textStyles}
                />
            </View>
            <StatusBar backgroundColor="#2B2D42" style="light" />
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    basicInput: {
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 3,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
});
