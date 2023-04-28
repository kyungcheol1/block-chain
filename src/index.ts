import { GENESIS } from "@constants/block.constants";
import Block from "@core/block/block";
import ProofofWork from "@core/block/wrorkproof/proofofwork";
import WorkProof from "@core/block/wrorkproof/workproof";
import CryptoModule from "@core/crypto/crypto.module";

const crypto = new CryptoModule();

const proofofwork = new ProofofWork(crypto);
const workproof = new WorkProof(proofofwork);
const block = new Block(crypto, workproof);

// 반복문을 통해서 블럭을 100개 만들기 // 100개를 배열에다가 담아주기
let BlockArray = [GENESIS];
let previousBlock = GENESIS;
let adjustmentBlock = GENESIS;

for (let i = 1; i < 100; i++) {
    if (i >= 1) {
        previousBlock = BlockArray[i - 1];
    }
    if (i - 20 >= 0) {
        // console.log((Math.floor(i / 10) - 1) * 10 - 1);
        let a = (Math.floor(i / 10) - 1) * 10;
        adjustmentBlock = BlockArray[a];
    }
    console.log(adjustmentBlock, i);
    BlockArray.push(block.createBlock(previousBlock, "asdfasdf", adjustmentBlock));

    // if (i - 10 > 0)
}

// console.log(BlockArray);

