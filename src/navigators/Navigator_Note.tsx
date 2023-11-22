import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage_Note from "../pages/MainPage_Note";

const Stack = createStackNavigator();

export default function Navigator_Note() {
    return (
        <Stack.Navigator initialRouteName="MainPage_Note">
            <Stack.Screen
                name="MainPage_Note"
                component={MainPage_Note}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
