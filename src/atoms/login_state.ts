import { atom } from "recoil";

export type login_data = {
    is_login: boolean;
    user_id: string;
    token: string;
};

export const login_state = atom<login_data>({
    key: "login_state",
    default: {
        is_login: false,
        user_id: "",
        token: "",
    },
});
