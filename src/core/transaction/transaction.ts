//Bitcoin총 발행량은 지정되어 있다.
// 50 BTC
// 4년마다 반감기
// 마이닝과 함께 50 BTC와 transaction 수수료 도 받는다.

import { IBlock } from "@core/block/block.interface";
import CryptoModule from "@core/crypto/crypto.module";
import { Receipt } from "@core/wallet/wallet.interface";
import { SignatureInput } from "elliptic";
import { TransactionRow, TxIn, TxOut } from "./transaction.interface";

class Transaction {
    private readonly REWARD = 50;
    constructor(private readonly crypto: CryptoModule) {}

    create(receipt: Receipt) {
        const totalAmount = 50;
        const txin1 = this.createTxIn(1, "", receipt.signature);
        // txin - > 영수즈엥 있는 sender에 잔액을 확인하는 작업이 필요
        // const txIn1 = transaction.createTxIn(1, "", receipt.signature);
        const txout_sender = this.createTxOut(receipt.sender.account, totalAmount - receipt.amount);
        const txout_received = this.createTxOut(receipt.received, receipt.amount);
        return this.createRow([txin1], [txout_sender, txout_received]);
    }

    //TxOut
    createTxOut(account: string, amount: number) {
        if (account.length !== 40) throw new Error("Account 형식이 옳바르지 않습니다"); // hex값 비교도 가능
        const txout = new TxOut();
        txout.account = account;
        txout.amount = amount;
        return txout;
    }

    serializeTxOut(txOut: TxOut): string {
        const { account, amount } = txOut;
        const text = [account, amount].join("");
        return this.crypto.SHA256(text);
    }

    createTxIn(txOutIndex: number, txOutId?: string, signature?: SignatureInput): TxIn {
        const txIn = new TxIn();
        txIn.txOutIndex = txOutIndex;
        txIn.txOutId = txOutId;
        txIn.signature = signature;
        return txIn;
    }

    serializeTxIn(txIn: TxIn): string {
        const { txOutIndex } = txIn;
        const text = [txOutIndex].join("");
        return this.crypto.SHA256(text);
    }

    createRow(txins: TxIn[], TxOuts: TxOut[]) {
        const transactionRow = new TransactionRow();
        transactionRow.txIns = txins;
        transactionRow.txOuts = TxOuts;
        transactionRow.hash = this.serilizeRow(transactionRow);
        return transactionRow;
    }

    serilizeTx<T>(data: T[], callback: (item: T) => string) {
        return data.reduce((acc: string, v: T) => {
            return acc + callback(v); //this가 이 함수 안에 있는 this를 바라보기 때문에 crypto를 찾을 수 없다.// class 에 대한 this를 찾지 않는다.
        }, "");
    }

    serilizeRow(row: TransactionRow) {
        const { txIns, txOuts } = row;
        if (!txIns || !txOuts) throw new Error("형태가 옳바르지 않습니다");

        const text1 = this.serilizeTx<TxOut>(txOuts, (item) => this.serializeTxOut(item));
        const text2 = this.serilizeTx<TxIn>(txIns, (item) => this.serializeTxIn(item));

        return this.crypto.SHA256(text1 + text2);
        // const txoutText = txOuts.reduce((acc: string, v: TxOut) => {
        //     return acc + this.serializeTxOut(v);
        // }, "");

        // const txinText = txIns.reduce((acc: string, v: TxIn) => {
        //     return acc + this.serializeTxIn(v);
        // }, "");
    }

    createCoinbase(account: string, latestBlockHeight: number) {
        //마이닝
        const txin = this.createTxIn(latestBlockHeight + 1);
        const txout = this.createTxOut(account, this.REWARD);

        return this.createRow([txin], [txout]);
    }
}

export default Transaction;

