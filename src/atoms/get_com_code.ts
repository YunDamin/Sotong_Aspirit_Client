import { atom } from "recoil";

export type content = {
    title: string;
    content: string;
    date: string;
    image_urls: string[];
};

export const contents_notice = atom<content[]>({
    key: "contents_notice",
    default: [],
});
