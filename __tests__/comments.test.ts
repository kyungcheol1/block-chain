import { CommentWriteDTO } from "@comment/comment.interface";
import CommentServicer from "@comment/comment.service";
import CommentRepository from "@comment/comment.repository";

describe("Comment Service", () => {
    let commentService: CommentServicer;
    let commentRepository: CommentRepository;
    beforeEach(() => {
        commentRepository = {
            create: jest.fn().mockResolvedValue({ id: 0, writer: "cheol", comment: "asfsafaf", boardid: 0 }),
        };
        commentService = new CommentServicer(commentRepository);
    });

    it("commentService 인스턴스 확인하기", () => {
        console.log(commentService);
        expect(typeof commentService).toBe("object");
        expect(commentService instanceof CommentServicer).toBeTruthy();
    });
    describe("Comment 글쓰기", () => {
        it("commentwrite", () => {
            expect(typeof commentService.write).toBe("function");
        });
        it("write 매개변수 잘 작성되어있는가?", async () => {
            //writer, comment boardid
            const data: CommentWriteDTO = {
                writer: "web7722",
                comment: "aaasdd123",
                boardid: 0,
            };

            const result = await commentService.write(data);
            expect(commentRepository.create).toBeCalledWith(data); //호출이 되었는지 확인 하는것
            expect(result).toEqual({ id: 0, writer: "cheol", comment: "asfsafaf", boardid: 0 });
        });
    });
});

