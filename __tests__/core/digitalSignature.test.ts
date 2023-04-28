import CryptoModule from "@core/crypto/crypto.module";
import DigitalSignature from "@core/transaction/digitalSignature";
import { Receipt } from "@core/transaction/transaction.interface";

describe("디지털서명", () => {
    let digitalSignature: DigitalSignature;
    //개인키 생성하는 코드

    beforeEach(() => {
        digitalSignature = new DigitalSignature(new CryptoModule());
    });
    describe("PrivateKey 생성", () => {
        it("잘 생성되냐?", () => {
            const privateKey = digitalSignature.createPrivateKey();
            expect(privateKey).toHaveLength(64);
        });
    });

    describe("Publickey 생성", () => {
        it("잘 생성 되냐", () => {
            const privateKey = digitalSignature.createPrivateKey();
            const publicKey = digitalSignature.createPublicKet(privateKey);

            console.log(publicKey);
            expect(publicKey).toHaveLength(66);
        });
    });

    describe("Account 생성", () => {
        it("잘 되냥", () => {
            const privateKey = digitalSignature.createPrivateKey();
            const publicKey = digitalSignature.createPublicKet(privateKey);
            const account = digitalSignature.createAccount(publicKey);
            console.log(account, publicKey);
            expect(account).toHaveLength(40);
        });
    });

    describe("서명", () => {
        let sender_privateKey: string;
        let sender_publicKey;
        let sender_account;

        let received_privateKey;
        let received_publicKey;
        let received_account;

        let receipt: Receipt;
        beforeEach(() => {
            sender_privateKey = digitalSignature.createPrivateKey();
            sender_publicKey = digitalSignature.createPublicKet(sender_privateKey);
            sender_account = digitalSignature.createAccount(sender_publicKey);

            received_privateKey = digitalSignature.createPrivateKey();
            received_publicKey = digitalSignature.createPublicKet(received_privateKey);
            received_account = digitalSignature.createAccount(received_publicKey);
            receipt = {
                sender: {
                    account: sender_account,
                    publicKey: sender_publicKey,
                },
                received: received_account,
                amount: 30,
            };
        });
        it("sign만들기", () => {
            const signature = digitalSignature.sign(sender_privateKey, receipt);
            console.log(signature);
            expect(typeof signature).toBe("object");
            //30450221 DER나타낸건데 이게 1byte > 0x30 DER 형
            // 0x44 전체 바이트를 0x02 R값을 시작하는 바이트 뭘까 이게?
            //00b31ad239c82c51ca0c3f43e8181624fe69861e39e35d18a2fc7f30fdef078cc602205eae72e2eb50734eb46b6f167f0b3bf329234ca6954181dc2382190f9e66bb6c
            //3045022100b31ad239c82c51ca0c3f43e8181624fe69861e39e35d18a2fc7f30fdef078cc602205eae72e2eb50734eb46b6f167f0b3bf329234ca6954181dc2382190f9e66bb6c
            expect(typeof signature.signature).not.toBe(undefined);
        });

        it("검증", () => {
            const receipt2 = digitalSignature.sign(sender_privateKey, receipt);
            //블록체인에게 recipt2를 넘겨준것

            receipt2.signature = receipt2.signature + "asda";
            const bool = digitalSignature.verify(receipt2);
            console.log(bool);
        });
    });
});

