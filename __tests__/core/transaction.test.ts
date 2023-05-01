import CryptoModule from "@core/crypto/crypto.module";
import Transaction from "@core/transaction/transaction";

describe("transaction ", () => {
    let transaction: Transaction;

    beforeEach(() => {
        transaction = new Transaction(new CryptoModule());
    });

    describe("createTxOut", () => {
        const account = "0".repeat(40);
        it("TxOut 생성하기", () => {
            const amount = 50;
            const txout = transaction.createTxOut(account, amount);
            console.log(txout);
            expect(txout.account).toBe(account);
            expect(txout.amount).toBe(amount);
        });

        it("TxOut account 값이 아닐경우", () => {
            const accounte = "0".repeat(39);
            const amount = 50;
            expect(() => {
                transaction.createTxOut(accounte, amount);
            }).toThrowError();
        });
    });
    describe("createIxIn", () => {
        const txOutIndex = 2;
        it("txIn생성하기", () => {
            const txin = transaction.createTxIn(txOutIndex);
            console.log(txin);
            expect(txin.txOutIndex).toBe(txOutIndex);
        });
    });

    describe("createRow", () => {
        it("transactionRow 만들기", () => {
            const txOutIndex = 2;
            const txin = transaction.createTxIn(txOutIndex);

            const account = "0".repeat(40);
            const amount = 50;
            const txout = transaction.createTxOut(account, amount);

            const row = transaction.createRow([txin, txin, txin], [txout]);

            // expect(row.txIns).toStrictEqual([txin]);
            // expect(row.txOuts).toStrictEqual([txout]);
            console.log(row);
            transaction.serilizeRow(row);
        });

        it("매개변수내용이 옳바르지 않을때", () => {
            const row = transaction.createRow([], []);
        });
    });
});

