import { BoardModel, BoardRepository, BoardWriterDTO } from "./board.interfaces";

class BoardService {
    constructor(private readonly boardRepository: BoardRepository) {}
    public async postWrite(data: BoardWriterDTO): Promise<BoardModel> {
        const { email, tel1, tel2, tel3 } = data;
        const tel = `${tel1}-${tel2}-${tel3}`;
        const { username } = await this.boardRepository.getUserByID(email);
        return { username, tel1, tel2, tel3 };
    }
}

export default BoardService;

