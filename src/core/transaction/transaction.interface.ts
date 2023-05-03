import { SignatureInput } from "elliptic";

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

export class UnspentTxOut {
    txOutId!: string;
    txOutIndex!: number;
    account!: string;
    amount!: number;
}

export type TransactionPool = string | TransactionRow[];
export type TransactionData = string | TransactionRow[];
export type UnspentTxOutpool = UnspentTxOut[];

//트랜젝션은 여러개가 존재한다. bitcoin의 경우 2천개~ 3천개 , 이더리움의 경우 200~ 300개 정도가 존재한다

