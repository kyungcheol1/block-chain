import Test123 from "@core/transaction/test";

describe("test", () => {
    let test: Test123;
    beforeEach(() => {
        console.log(11111);
        test = new Test123();
    });
    it("123123", () => {
        const a = test.test456();
        console.log(a, 1111);
    });
    describe("되냐?", () => {
        console.log(test, 11);
        it("이건되나 ?", () => {
            console.log(test.test456(), 222);
        });
    });
});

// jest > discribe()부터 모두 다 읽고 , it()을 실행 >> 근데 it ()실행 전에 beforeEach() 실행이 되는것

