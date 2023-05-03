import { SignatureInput } from "elliptic";

export class Sender {
    publicKey?: string;
    account!: string; // b라는 사람의공개 키
}

export class Receipt {
    sender!: Sender;
    received!: string;
    amount!: number;
    signature?: SignatureInput;
}

export class Accounts {
    privateKey!: string;
    publicKey!: string;
    account!: string;
}

