import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabRoutes } from "../../../navigation/routes";
import styles from "./style";
import SettingTabScreen from "../SettingTab/SettingTabScreen";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <View style={styles.screen}><Text>Home</Text></View>;
}
function WishlistScreen() {
  return <View style={styles.screen}><Text>Wishlist</Text></View>;
}
function CartScreen() {
  return <View style={styles.screen}><Text>Cart</Text></View>;
}
function SearchScreen() {
  return <View style={styles.screen}><Text>Search</Text></View>;
}
function SettingScreen() {
  return <View style={styles.screen}><Text>Setting</Text></View>;
}

const ACTIVE = "#EB3030";
const INACTIVE = "#000000";

function CenterTabButton(props: any) {
  const { onPress, accessibilityState } = props;
  const selected = accessibilityState?.selected;

  return (
    <Pressable onPress={onPress} style={styles.centerBtnWrap}>
      <View
        style={[
          styles.centerBtnBase,
          selected ? styles.centerBtnActive : styles.centerBtnInactive,
        ]}
      >
        <Ionicons
          name="cart-outline"
          size={28}
          color={selected ? "#FFFFFF" : "#000000"}
        />
      </View>
    </Pressable>
  );
}

export default function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name={TabRoutes.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={TabRoutes.Wishlist}
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={TabRoutes.Cart}
        component={CartScreen}
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => <CenterTabButton {...props} />,
        }}
      />

      <Tab.Screen
        name={TabRoutes.Search}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={TabRoutes.Setting}
        component={SettingTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}