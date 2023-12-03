import { atom } from "recoil";

export type content = {
    title: string;
    content: string;
    date: string;
};

export const contents_news = atom<content[]>({
    key: "contents_news",
    default: [],
});

export const contents_guide = atom<content[]>({
    key: "contents_guide",
    default: [],
});

export const contents_article = atom<content[]>({
    key: "contents_article",
    default: [],
});

export const contents_notice = atom<content[]>({
    key: "contents_notice",
    default: [],
});
