import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage_Main from "../pages/LoginPage_Main";
import LoginPage_Permission from "../pages/LoginPage_Permission";
import LoginPage_Checking from "../pages/LoginPage_Checking";
import LoginPage_Input from "../pages/LoginPage_Input";
import LoginPage_Thanks from "../pages/LoginPage_Thanks";

const Stack = createStackNavigator();

export default function SubNavigator_Login({ navigation }: any) {
    return (
        <Stack.Navigator initialRouteName="LoginPage_Main">
            <Stack.Screen
                name="LoginPage_Main"
                component={LoginPage_Main}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="LoginPage_Permission"
                component={LoginPage_Permission}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="LoginPage_Checking"
                component={LoginPage_Checking}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="LoginPage_Input"
                component={LoginPage_Input}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="LoginPage_Thanks"
                component={LoginPage_Thanks}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
