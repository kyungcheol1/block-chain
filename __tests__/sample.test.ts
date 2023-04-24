class Block {
    public readonly height: number = 0;
    create() {
        return 15;
    }
}

describe("bloack 테스트", () => {
    console.log("hello world");
    it("B테스트 height속성 확인", () => {
        console.log(new Block().height);
    });

    it("bloack create 메서드 확인", () => {
        console.log(new Block().create());
    });
});

describe("user controller 검증", () => {
    it("create()함수가 잘 실행되는가 ?", () => {
        //req.body 넣고 , service 메서드 넣고
    });
    it("create() 예외처리 잘 되는가", () => {
        //req.body 강제로 다른 값 넣고 바꾼다음
        //service 메서드 호출 강제로 에러
        //catch 문으로 잘 빠지고 > next() 잘 실행 되는지 체크
    });
});

console.log("hello world");

