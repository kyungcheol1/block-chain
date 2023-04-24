import { CommentWriteDTO } from "./comment.interface";
import CommentRepository from "./comment.repository";

class CommentServicer {
    constructor(private readonly commentRepository: CommentRepository) {}
    async write(data: CommentWriteDTO) {
        const result = await this.commentRepository.create(data);

        return result;
    }
}

export default CommentServicer;

