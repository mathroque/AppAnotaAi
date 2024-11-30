import { StyleSheet, Text, View, Animated, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { ListContext } from "../context/list-context";
import { GestureHandlerRootView, HandlerStateChangeEvent, Swipeable, TextInput } from "react-native-gesture-handler";
import { ItemsType } from "../Types/Item";

const Lists = () => {
    const { listContext, setListContext } = useContext(ListContext);
    const [listItems, setListItems] = useState<ItemsType[]>([]);

    useEffect(() => {
        setListItems(listContext);
    }, [listContext]);

    const totalAmount = listItems.reduce((accumulator, currentValue) => accumulator + Number(currentValue.value), 0);

    const formatValue = (value: number) => {
        const result = value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        return result;
    };

    const renderRightActions = (
        progress: Animated.AnimatedInterpolation<any>,
        dragAnimatedValue: Animated.AnimatedInterpolation<any>,
    ) => {
        return (
            <View style={styles.eraseContainer}>
                <Text className="text-sm font-bold text-white">Apagar?</Text>
            </View>
        );
    };

    const eraseItem = (e: HandlerStateChangeEvent<Record<string, unknown>>, index: number) => {
        if (Number(e.nativeEvent.translationX) < -159) {
            const newList = listItems.filter((listItem, i) => i != index);
            setListItems(newList);
        }
    };

    const onValueChange = (e: string, index: number) => {
        console.log(Number(e));
        
        const itemIndex = listItems.findIndex((listItem, i) => i == index);
        const newList = [...listItems];
        newList[itemIndex] = { name: newList[itemIndex].name, value: Number(e) };
        setListItems(newList)
    };
    return (
        <ScrollView className="bg-primary h-85vh pt-10">
            <GestureHandlerRootView>
                {listItems.length ? (
                    <View style={styles.headerContainer}>
                        <Text className="text-lg font-bold text-white">Total</Text>
                        <Text className="text-lg font-bold text-white">{formatValue(totalAmount)}</Text>
                    </View>
                ) : (
                    <></>
                )}
                <View className="p-2">
                    <Text className="text-lg font-bold text-white">Itens</Text>

                    <View>
                        {listItems.length ? (
                            listItems.map((item, i) => (
                                <Swipeable
                                    key={i}
                                    renderRightActions={renderRightActions}
                                    onEnded={(e) => eraseItem(e, i)}
                                >
                                    <View style={styles.container}>
                                        <Text className="text-lg font-bold text-gray">{item.name}</Text>
                                        <TextInput
                                            className="text-lg font-bold text-gray"
                                            onChangeText={(e) => onValueChange(e, i)}
                                            value={String(item.value)}
                                        />
                                    </View>
                                </Swipeable>
                            ))
                        ) : (
                            <Text className="text-sm font-bold text-white mx-auto">Nenhum item adicionado...</Text>
                        )}
                    </View>
                    <CustomButton
                        title="Salvar"
                        handlePress={() => setListContext(listItems)}
                        containerStyles="bg-secondary-100 my-2"
                        textStyles="text-primary"
                    />
                    {listItems.length ? (
                        <CustomButton
                            title="Limpar lista"
                            handlePress={() => setListItems([])}
                            containerStyles="bg-red my-2"
                            textStyles="text-primary"
                        />
                    ) : (
                        ""
                    )}
                </View>
                <StatusBar backgroundColor="#2B2D42" style="light" />
            </GestureHandlerRootView>
        </ScrollView>
    );
};

export default Lists;

const styles = StyleSheet.create({
    basicInput: {
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 3,
    },
    headerContainer: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#494949",
    },
    eraseContainer: {
        padding: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#9b0808",
        width: "100%",
    },
    container: {
        borderRadius: 3,
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginVertical: 4,
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

    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        paddingLeft: 5,
        backgroundColor: "#efefef",
        margin: 20,
        minHeight: 50,
    },
    swipedRow: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        paddingLeft: 5,
        backgroundColor: "#818181",
        margin: 20,
        minHeight: 50,
    },
    swipedConfirmationContainer: {
        flex: 1,
    },
    deleteConfirmationText: {
        color: "#fcfcfc",
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#b60000",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
    },
    deleteButtonText: {
        color: "#fcfcfc",
        fontWeight: "bold",
        padding: 3,
    },
});
