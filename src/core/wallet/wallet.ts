import DigitalSignature from "./digitalSignature";
import { Accounts, Receipt } from "./wallet.interface";

class Wallet {
    private readonly accounts: Accounts[] = [];
    constructor(private readonly digitalSignature: DigitalSignature) {}

    create(): Accounts {
        const privateKey = this.digitalSignature.createPrivateKey();
        const publicKey = this.digitalSignature.createPublicKet(privateKey);
        const account = this.digitalSignature.createAccount(publicKey);

        const accounts: Accounts = {
            account,
            publicKey,
            privateKey,
        };
        this.accounts.push(accounts);
        return accounts;
    }
    set(privateKey: string) {
        const publicKey = this.digitalSignature.createPublicKet(privateKey);
        const account = this.digitalSignature.createAccount(publicKey);

        const accounts: Accounts = {
            account,
            publicKey,
            privateKey,
        };
        this.accounts.push(accounts);
        return accounts;
    }
    getAccounts() {
        const accounts = this.accounts.map((v) => v.account);
        return accounts;
    }
    private getPrivate(account: string): string {
        return this.accounts.filter((v) => v.account === account)[0].account;
    }

    receipt(received: string, amount: number) {
        const { account, publicKey, privateKey } = this.accounts[0];
        const sender = {
            account,
            publicKey,
        };

        const receipt: Receipt = {
            sender,
            received,
            amount,
        };

        receipt.signature = this.digitalSignature.sign(privateKey, receipt).signature;

        return receipt;
    }

    sign() {}
    verify() {}
}

export default Wallet;

//배열형태로 account를 저장하는 용도로 사용할 것

