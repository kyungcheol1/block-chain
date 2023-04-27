import { VERSION } from "@constants/block.constants";
import CryptoModule from "@core/crypto/crypto.module";
import { BlockData, BlockInfo, IBlock } from "./block.interface";
import { TransactionData, TransactionRow } from "../transaction/transaction.interface";
import WorkProof from "./wrorkproof/workproof";

class Block {
    constructor(private readonly crypto: CryptoModule, private readonly workProof: WorkProof) {}

    createBlock(previousBlock: IBlock, data: TransactionData, adjustmentBlock: IBlock) {
        const blockData = this.createBlockData(previousBlock, data);
        this.workProof.run(blockData, adjustmentBlock);
        //로직 (작업증명)
        //OOP -> 전략패턴 > 로그인 > passport
        //기능이 추가가 되었을 때 class 를 하나 더 만든다
    }
    // 10번재 블럭과 이 블럭의 시간 차가 빠른지 느린지 체크하기 위해서 필요하다.
    // 빠르게 만들고 있다면 난이도를 올리고, 느리게 만들고 있다면 난이도 내림

    isValidBlock(block: IBlock): void {
        this.crypto.isValidHash(block.hash);
        const validHash = this.crypto.createBlockHash(block);
        if (validHash !== block.hash) throw new Error(`블럭 해시값이 옳바르지 않습니다 hash: ${validHash},${block.hash}`);

        //block 에 있는 hash값이 hash 형태와 일치하는가?
    }
    createBlockData(previousBlock: IBlock, data: TransactionData): BlockData {
        const blockinfo = this.createBlockInfo(previousBlock);
        //blockinfo 값을 받고 ,

        return {
            ...blockinfo,
            merkleRoot: "",
            data,
        } as BlockData;
    }

    createBlockInfo(previousBlock: IBlock): BlockInfo {
        this.isValidBlock(previousBlock);
        //block 검증이란 > 해시에 대한것을 다 검증하는것이다. ex) merkleRoot, hash
        // const blockInfo: BlockInfo = {
        //     version: VERSION,
        //     height: previousBlock.height + 1,
        //     timestamp: new Date().getTime(),
        //     previousHash: previousBlock.hash,
        //     merkleRoot: "",
        //     nonce: 0,
        //     difficulty: 0,
        // };

        const blockInfo = new BlockInfo();
        blockInfo.version = VERSION;
        blockInfo.height = previousBlock.height + 1;
        blockInfo.timestamp = new Date().getTime();
        blockInfo.previousHash = previousBlock.hash;
        // blockInfo.nonce = 0;
        // blockInfo.difficulty = 0; // 인터페이스 만들 때 써줬기 때문에 상관없다
        //객체의 순서가 바뀌지 않는다
        return blockInfo;
    } //
}

export default Block;

