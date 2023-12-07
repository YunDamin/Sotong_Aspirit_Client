import { atom } from "recoil";

export type user = {
    user_name: string;
    user_sex: string;
    user_birth: string;
    user_email: string;
    user_nick_name: string;
    user_notes: string[];
    user_av: number;
    img_urls: string[];
};

export const user_state = atom<user>({
    key: "user_state",
    default: {
        user_name: "",
        user_sex: "",
        user_birth: "",
        user_email: "",
        user_nick_name: "",
        user_notes: [],
        user_av: 0,
        img_urls: [],
    },
});
