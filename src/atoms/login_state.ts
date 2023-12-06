import { atom } from "recoil";

export type login_data = {
    is_login: boolean;
    login_type: string;
    user_id: string;
    accessToken: string;
    refreshToken: string;
    survey: boolean;
};

export const login_state = atom<login_data>({
    key: "login_state",
    default: {
        is_login: false,
        login_type: "",
        user_id: "",
        accessToken: "",
        refreshToken: "",
        survey: false,
    },
});
