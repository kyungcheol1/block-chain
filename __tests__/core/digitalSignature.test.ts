import DigitalSignature from "@core/transaction/digitalSignature";

describe("디지털서명", () => {
    let digitalSignature: DigitalSignature;
    //개인키 생성하는 코드
    describe("PrivateKey 생성", () => {
        beforeEach(() => {
            digitalSignature = new DigitalSignature();
        });
        it("잘 생성되냐?", () => {});
    });

    describe("Publickey 생성", () => {
        beforeEach(() => {
            digitalSignature = new DigitalSignature();
        });
        it("잘 생성 되냐", () => {
            let PrivateKey = digitalSignature.createPrivateKey();
            digitalSignature.createPublicKet(PrivateKey);
        });
    });
});

