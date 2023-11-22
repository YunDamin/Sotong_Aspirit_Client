import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage_Contents from "../pages/MainPage_Contents";

const Stack = createStackNavigator();

export default function Navigator_Contents() {
    return (
        <Stack.Navigator initialRouteName="MainPage_Home">
            <Stack.Screen
                name="MainPage_Contents"
                component={MainPage_Contents}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
