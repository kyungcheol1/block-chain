export class Receipt {
    sender!: string;
    received!: string;
    amount!: string;
    signauter!: unknown;
}

export class TransactionRow {
    hash?: string;
}
export type TransactionData = string | TransactionRow[];

//트랜젝션은 여러개가 존재한다. bitcoin의 경우 2천개~ 3천개 , 이더리움의 경우 200~ 300개 정도가 존재한다

