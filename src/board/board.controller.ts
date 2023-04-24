import { BoardWriterDTO } from "./board.interfaces";
import BoardService from "./board.service";

class BoardController {
    constructor(private readonly boardService: BoardService) {}
    public write() {
        const data: BoardWriterDTO = {
            email: "",
            subject: "",
            content: "",
            hashtag: "",
            category: "",
            images: "",
            thumbnail: "",
            tel1: 123,
            tel2: 346,
            tel3: 789,
        };
        this.boardService.postWrite(data);
    }
}

