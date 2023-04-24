export interface BoardWriterDTO {
    email: string;
    subject: string;
    content: string;
    hashtag: string;
    category: string;
    images: string;
    thumbnail: string;
    tel1: number;
    tel2: number;
    tel3: number;
}

export interface BoardModel {
    email?: string;
    username: string;
    subject?: string;
    tel1: number;
    tel2: number;
    tel3: number;
}

export interface BoardRepository {
    getUserByID: (email: string) => Promise<BoardModel>;
}

