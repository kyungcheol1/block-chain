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

export class TxIn {
    txOutId?: string;
    txOutIndex!: number;
    signature?: SignatureInput;
}

export class TxOut {
    account!: string;
    amount!: number;
}

export class TransactionRow {
    txIns?: TxIn[];
    txOuts!: TxOut[];
    hash?: string;
}
export type TransactionData = string | TransactionRow[];

//트랜젝션은 여러개가 존재한다. bitcoin의 경우 2천개~ 3천개 , 이더리움의 경우 200~ 300개 정도가 존재한다

