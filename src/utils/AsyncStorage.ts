import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? value : null;
    } catch (e) {
        console.log(e);
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(e);
    }
};

export const containsData = async (
    key: string
): Promise<[boolean, string | null]> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value != null) {
            return [true, value];
        }

        return [false, null];
    } catch (e) {
        console.log(e);

        return [false, null];
    }
};
