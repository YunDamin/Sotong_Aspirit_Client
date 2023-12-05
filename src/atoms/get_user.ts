import { atom } from "recoil";

export type user = {
    user_email: string;
    user_nick_name: string;
    user_notes: string[];
    user_av: number;
};

export const user_state = atom<user>({
    key: "user_state",
    default: {
        user_email: "",
        user_nick_name: "",
        user_notes: [],
        user_av: 0,
    },
});
