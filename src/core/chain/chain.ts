import { GENESIS } from "@constants/block.constants";
import { IBlock } from "@core/block/block.interface";

class Chain {
    private readonly chain: IBlock[] = [GENESIS];
    private readonly INTERVAL = 10;

    constructor() {}

    get() {
        return this.chain;
    }

    length() {
        return this.chain.length;
    }

    latestBlock() {
        return this.chain[this.length() - 1];
    }
    //블럭 하나 생성
    addToChain(receivedBlock: IBlock) {
        this.chain.push(receivedBlock);
        return this.latestBlock();
    }
    //블럭 검증
    isValid() {}

    //네트워크에서 블럭을 최신화 하기 위해 다른 사람의 블럭을 받아오기 위해
    replaceChain() {}

    getBlock(callbackFn: (block: IBlock) => boolean) {
        const findBlock = this.chain.find(callbackFn);
        if (!findBlock) throw new Error("블럭이 없습니다");
        return findBlock;
    }
    getBlockByHeigh(height: number) {
        return this.getBlock((block: IBlock) => block.height === height);
    }

    getBlockByHash(hash: string) {
        return this.getBlock((block: IBlock) => block.hash === hash);
    }

    //10번째 블럭들
    getAdjustBlock() {
        const { height } = this.latestBlock();
        const findHeight = height < this.INTERVAL ? 1 : Math.floor(height / this.INTERVAL) * this.INTERVAL;
        return this.getBlockByHeigh(findHeight);
    }

    //네트워크로 보낼 때 객체 > 스트링 > 객체 형태로 바꾸는 것
    serialize() {
        return JSON.stringify(this.chain);
    }
    deserialize(chunk: string) {
        return JSON.parse(chunk);
    }
}

export default Chain;

