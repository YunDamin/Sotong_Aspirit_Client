import { atom } from "recoil";

export type login_data = {
    is_login: boolean;
    user_id: string;
    accessToken: string;
    refreshToken: string;
};

export const login_state = atom<login_data>({
    key: "login_state",
    default: {
        is_login: false,
        user_id: "",
        accessToken: "",
        refreshToken: "",
    },
});
