import { VERSION } from "@constants/block.constants";
import CryptoModule from "@core/crypto/crypto.module";
import { BlockData, BlockInfo, IBlock } from "./block.interface";
import { TransactionData, TransactionRow } from "../transaction/transaction.interface";

class Block {
    constructor(private readonly crypto: CryptoModule) {}

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

