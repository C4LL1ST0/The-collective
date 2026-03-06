export interface ApiMnipageRes{
    data: Minipage[];
}

export interface Minipage{
    title: string;
    description: string;
    tname: string;
    figures: Figure[];
}

export interface Figure{
    caption: string;
    url: string;
}