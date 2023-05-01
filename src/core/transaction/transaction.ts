//Bitcoin총 발행량은 지정되어 있다.
// 50 BTC
// 4년마다 반감기
// 마이닝과 함께 50 BTC와 transaction 수수료 도 받는다.

import { IBlock } from "@core/block/block.interface";
import { TransactionRow, TxIn, TxOut } from "./transaction.interface";

class Transaction {
    private readonly REWARD = 50;

    //TxOut
    createTxOut(account: string, amount: number) {
        if (account.length !== 40) throw new Error("Account 형식이 옳바르지 않습니다"); // hex값 비교도 가능
        const txout = new TxOut();
        txout.account = account;
        txout.amount = amount;
        return txout;
    }

    createTxIn(txOutIndex: number) {
        const txIn = new TxIn();
        txIn.txOutIndex = txOutIndex;
        return txIn;
    }

    createRow(txins: TxIn[], TxOuts: TxOut[]) {
        const transactionRow = new TransactionRow();
        transactionRow.txIns = txins;
        transactionRow.txOuts = TxOuts;
        return transactionRow;
    }

    createCoinbase(account: string, latestBlock: IBlock) {
        //마이닝
        const txin = this.createTxIn(latestBlock.height + 1);
        const txout = this.createTxOut(account, this.REWARD);

        return this.createRow([txin], [txout]);
    }
}

export default Transaction;

