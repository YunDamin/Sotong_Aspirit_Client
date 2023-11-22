import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage_Home from "../pages/MainPage_Home";

const Stack = createStackNavigator();

export default function Navigator_Funding() {
    return (
        <Stack.Navigator initialRouteName="MainPage_Home">
            <Stack.Screen
                name="MainPage_Home"
                component={MainPage_Home}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
