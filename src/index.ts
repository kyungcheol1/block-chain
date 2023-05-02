import { GENESIS } from "@constants/block.constants";
import Block from "@core/block/block";
import ProofofWork from "@core/block/wrorkproof/proofofwork";
import WorkProof from "@core/block/wrorkproof/workproof";
import CryptoModule from "@core/crypto/crypto.module";
import DigitalSignature from "@core/transaction/digitalSignature";
import Transaction from "@core/transaction/transaction";
import { Receipt } from "@core/transaction/transaction.interface";

const crypto = new CryptoModule();

const proofofwork = new ProofofWork(crypto);
const workproof = new WorkProof(proofofwork);
const block = new Block(crypto, workproof);
const digitalSignature = new DigitalSignature(crypto);
const transaction = new Transaction(crypto);

// 반복문을 통해서 블럭을 100개 만들기 // 100개를 배열에다가 담아주기
let BlockArray = [GENESIS];
let previousBlock = GENESIS;
let adjustmentBlock = GENESIS;

// for (let i = 1; i < 100; i++) {
//     if (i >= 1) {
//         previousBlock = BlockArray[i - 1];
//     }
//     if (i - 20 >= 0) {
//         // console.log((Math.floor(i / 10) - 1) * 10 - 1);
//         let a = (Math.floor(i / 10) - 1) * 10;
//         adjustmentBlock = BlockArray[a];
//     }
//     console.log(adjustmentBlock, i);
//     BlockArray.push(block.createBlock(previousBlock, "asdfasdf", adjustmentBlock));

//     // if (i - 10 > 0)
// }

//코인 베이스

const privateKey = "d07752446ff6c292de93dc2e3c6aac86caef6b211d007ee4e22fc559888a6438";
const publicKey = digitalSignature.createPublicKet(privateKey);
const account = digitalSignature.createAccount(publicKey);

const tx = transaction.createCoinbase(account, GENESIS.height);
const block2 = block.createBlock(GENESIS, [tx], GENESIS);
console.log(block2);
const receipt: Receipt = {
    sender: {
        account,
        publicKey,
    },
    received: "0".repeat(40),
    amount: 30,
    signature: "0000",
};

const coinbase2 = transaction.createCoinbase(account, block2.height);

// const coinbase3 = transaction.createCoinbase(account, block2.height);
// const block3 = block.createBlock(block2, [coinbase3, tx1], GENESIS);

// console.log(block3);

// console.log(BlockArray);

// 영수증 -> transaction -> block 생 성

// GENESis > block2 coninbase
// GENESIS > block3 coinbase + transaction 1건

