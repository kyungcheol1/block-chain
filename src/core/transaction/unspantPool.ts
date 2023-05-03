import { Receipt } from "@core/wallet/wallet.interface";
import Transaction from "./transaction";
import { TransactionRow, TxIn, TxOut, UnspentTxOut, UnspentTxOutpool } from "./transaction.interface";

class Unspent {
    private readonly UnspentTxOuts: UnspentTxOutpool = [];
    constructor(private readonly transaction: Transaction) {}

    getUnspentTxPool() {
        return this.UnspentTxOuts;
    }

    delete(txin: TxIn) {
        const index = this.UnspentTxOuts.findIndex((utxo) => {
            return utxo.txOutId === txin.txOutId && utxo.txOutIndex === txin.txOutIndex;
        });
        this.UnspentTxOuts.splice(index);
    }

    createUTXO(transaction: TransactionRow) {
        const { hash, txOuts } = transaction;
        if (!hash) throw new Error("hash값이 존재하지 않습니다");

        transaction.txIns?.forEach((v) => this.delete(v));

        const unspect = txOuts.map((txOuts: TxOut, index) => {
            const unspentTxOut = new UnspentTxOut();
            unspentTxOut.txOutId = hash;
            unspentTxOut.txOutIndex = index;
            unspentTxOut.account = txOuts.account;
            unspentTxOut.amount = txOuts.amount;
            return unspentTxOut;
        });

        // let index = 0;
        // const utxo = new UnspentTxOut();
        // utxo.txOutId = hash;
        // utxo.txOutIndex = index;
        // utxo.account = txOuts[index].account;
        // utxo.amount = txOuts[index].amount;

        // return utxo;
        this.UnspentTxOuts.push(...unspect);
    }

    me(account: string, utxo?: UnspentTxOut[]): UnspentTxOut[] {
        const myUnspentTxOuts = this.UnspentTxOuts.filter((utxo) => (utxo.account = account));
        return myUnspentTxOuts;
    }

    getAmount(myUnspantTxOuts: UnspentTxOut[]) {
        return myUnspantTxOuts.reduce((acc, utxo) => acc + utxo.amount, 0);
    }

    isAmount(account: string, sendAmount: number) {
        const myUnspantTxOuts = this.me(account);
        const totalAmount = this.getAmount(myUnspantTxOuts);
        if (totalAmount < sendAmount) return true;
        return false;
    }

    getInput(receipt: Receipt) {
        const {
            sender: { account },
            amount, // 30
        } = receipt;
        const myUnspantTxOuts = this.me(account); // 미사용 객체가 4개라고 가정하자.
        // 나의 관련된 미사용 객체에서 `receipt.amount`
        let targetAmount = 0; // 10 20 30
        let txin = []; // [{txOut관련!}]
        for (const unspentTxOut of myUnspantTxOuts) {
            targetAmount += unspentTxOut.amount;
            txin.push(unspentTxOut);
            if (targetAmount >= amount) break;
        }
        return txin;
    }

    getoutput(receipt: Receipt) {
        const {
            sender: { account },
            received,
            amount,
        } = receipt;
        const txOuts = [];
        // 받는 사람에 대한 txout
        const totalAmount = this.getAmount(this.me(account));
        const recevied_txout = this.transaction.createTxOut(received, amount);
        txOuts.push(recevied_txout);
        if (totalAmount - amount <= 0) {
            const sender = this.transaction.createTxOut(account, totalAmount - amount);
            txOuts.push(sender);
        }
        return txOuts;
    }
}

export default Unspent;

