import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

type TabIconProp = {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabIconProp) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#E86A92",
                    tabBarInactiveTintColor: "#41E2BA",
                    tabBarStyle: {
                        backgroundColor: "#2B2D42",
                        borderTopWidth: 1,
                        borderTopColor: "#444444",
                        height: 64,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} focused={focused} name="Início" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="lists"
                    options={{
                        title: "Lists",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.list} color={color} focused={focused} name="Lista" />
                        ),
                    }}
                />

            </Tabs>
        </>
    );
};

export default TabsLayout;

const styles = StyleSheet.create({});
