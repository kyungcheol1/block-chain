import { BLOCK_GENERATION_INTERVAL, DIFFICULTY_ADJUSTMENT_INTERVAL } from "@constants/block.constants";
import CryptoModule from "@core/crypto/crypto.module";
import { BlockData, IBlock } from "../block.interface";
import { DifficultyProps, Proof, ProofOfWorkProps } from "./workproof.interface";

class ProofofWork implements Proof {
    constructor(private readonly crypto: CryptoModule) {}
    execute(props: ProofOfWorkProps): IBlock {
        const { blockData, adjustmentBlock } = props;
        let block: IBlock = { ...blockData, hash: "" };
        //blockData.nonce = blockData.nonce +1
        //blockData.timestamp = new Data().getTime()
        //blockData.difficulty = ?
        //blockDAta.hash = SHA256 <-- crypto hex
        //hex -> binary 0 blockData.difficulty 비교
        //binary 맞으면 return blockDAta + hash as IBlock
        do {
            block.nonce += 1;
            block.timestamp = new Date().getTime();
            // const difficultyProps: DifficultyProps = {
            //     height: block.height,
            //     currentTime: block.timestamp,
            //     adjTime: adjustmentBlock.timestamp,
            //     difficulty: adjustmentBlock.difficulty,
            // };
            block.difficulty = this.getDifficulty(this.getDifficultyProps(block, adjustmentBlock));
            block.hash = this.crypto.createBlockHash(block);
        } while (!this.crypto.hashToBinary(block.hash).startsWith("0".repeat(block.difficulty)));

        return block;
    }

    getDifficultyProps(block: IBlock, adjustmentBlock: IBlock): DifficultyProps {
        const { height, timestamp: currentTime } = block;
        const { difficulty, timestamp: adjTime } = adjustmentBlock;
        return { height, currentTime, difficulty, adjTime };
    }
    //매개변수 블록높이
    // 이전블록의 난이도
    // 현재블록 Timestamp
    // 10번째 전 블록 생성시간 Timestamp
    getDifficulty(props: DifficultyProps): number {
        const { height, currentTime, adjTime, difficulty } = props;

        if (height <= 0) throw new Error("높이가 0이 들어왔습니다.");
        if (height < 10) return 0;
        if (height < 21) return 1;

        if (height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return difficulty;

        const timeTaken = currentTime - adjTime;
        const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;

        if (timeTaken < timeExpected / 2) return difficulty + 1;
        if (timeTaken > timeExpected * 2) return difficulty - 1;
        //block 높이가 20이하일 경우에는 체크 x
        //블럭 높이가 10의 배수가 아닐경우는 이전 블록 난이도로 설정
        // 현재블록 생성시간 - 10번째 블록의 생성시간 = 총 걸린시간
        // 목표시간 1블럭당 10분 = 10개 = 100분
        // 생성시간이 빨랐다 총걸린시간 < 목표시간/2 = 이전블록.난이도+1
        // 생성시간이 빨랐다 총걸린시간 > 목표시간*2 = 이전블록.난이도 -1
        // 비슷하면 이전블록 .난이도
        return 0;
    }
}

export default ProofofWork;

