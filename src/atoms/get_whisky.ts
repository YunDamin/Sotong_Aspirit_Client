import { atom } from "recoil";

export type whisky = {
    whisky_id: string;
    name_kor: string;
    name_eng: string;

    origins: string;
    color: string;
    noses: string;
    palates: string;
    finishes: string;
    bewerys: string;
    pairings: string;

    img_urls: string[];
    note_av: number;
    note_num: number;
};

export const whisky_state = atom<whisky[]>({
    key: "whisky_state",
    default: [],
});
