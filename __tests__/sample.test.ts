import { BoardRepository, BoardWriterDTO } from "@board/board.interfaces";
import BoardService from "@board/board.service";

class Block {
    public readonly height: number = 0;
    create() {
        return 15;
    }
}

describe("Board Service", () => {
    let boardService: BoardService;
    let boardRepository: BoardRepository;
    beforeEach(() => {
        // const boardRepository: BoardRepository = {
        //     getUserByID: (email: string) => {
        //         return {} as BoardModel;
        //     },
        // };
        boardRepository = {
            getUserByID: jest.fn().mockResolvedValue("web7722"),
        };
        boardService = new BoardService(boardRepository);
    });
    //단위테스트 > 로직 자체만 테스트를 하기 때문에 db 요청과 같은 것은 테스트를 하면 안됨
    //클래스를 작성 할 때 의존 주입이 왜 필요한가 ?

    it("postwrite", async () => {
        const dto: BoardWriterDTO = {
            email: "asdad",
            subject: "asdad",
            content: "asd",
            hashtag: "asf",
            category: "asfa",
            images: "asfa",
            thumbnail: "asf",
            tel1: 123,
            tel2: 346,
            tel3: 789,
        };
        const { username, tel1, tel2, tel3 } = await boardService.postWrite(dto);
        expect(boardRepository.getUserByID).toBeCalled(); // getUserById 실행이 된적이 있는지 없는지 여부를 체크
        // expect(boardRepository.getUserByID).toBeCalledWith(`${tel1}-${tel2}-${tel3}`);
    });
});

// describe("bloack 테스트", () => {
//     console.log("hello world");
//     it("B테스트 height속성 확인", () => {
//         console.log(new Block().height);
//     });

//     it("bloack create 메서드 확인", () => {
//         console.log(new Block().create());
//     });
// });

// class UserController {
//     public num: number = 0;
// }

// describe("user controller 검증", () => {
//     let result: { name: string } = { name: "" };
//     let user: UserController;
//     beforeEach(() => {
//         user = new UserController();
//     }); // 중복된 값이 많이 생겼을 때 쓸 수 있는것
//     //2번 실행된다. 이벤트 실행 같은 개념
//     afterAll(() => {
//         //실행 되고 나서 딱 한번
//     });
//     afterEach(() => {
//         //실행 되고 나서 계속
//     });
//     beforeAll(() => {
//         //it 함수가 실행되기 전에 딱 한번
//         result = { name: "hello world" };
//     });
//     it("create()함수가 잘 실행되는가 ?", () => {
//         let a = 1 + 1;
//         console.log(result);
//         user.num = 10;
//         //req.body 넣고 , service 메서드 넣고
//         expect(0).toBe(user.num);
//     });
//     it("create() 예외처리 잘 되는가", () => {
//         let a = 1 + 1;
//         console.log(result);

//         //req.body 강제로 다른 값 넣고 바꾼다음
//         //service 메서드 호출 강제로 에러
//         //catch 문으로 잘 빠지고 > next() 잘 실행 되는지 체크

//         //expect , matcher

//         expect(0).toBe(user.num);
//     });
// });

// console.log("hello world");

