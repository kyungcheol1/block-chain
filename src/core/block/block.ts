import { VERSION } from "@constants/block.constants";
import CryptoModule from "@core/crypto/crypto.module";
import { BlockInfo, IBlock } from "./block.interface";

class Block {
    constructor(private readonly crypto: CryptoModule) {}

    isValidBlock(block: IBlock): void {
        //block 에 있는 hash값이 hash 형태와 일치하는가?
    }
    createBlockInfo(previousBlock: IBlock): BlockInfo {
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

