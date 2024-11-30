import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";

const App = () => {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <Image source={images.logo} className="h-[134px]" resizeMode="contain" />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            <Text className="text-secondary">Anota Aí </Text>
                            pra não perder o controle de suas compras
                        </Text>
                    </View>
                    <CustomButton title="Começar" handlePress={() => router.push('/home')} containerStyles="w-full mt-7"/>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#2B2D42" style="light"/>
        </SafeAreaView>
    );
};

export default App;
