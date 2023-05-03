// import { GENESIS } from "@constants/block.constants";
// import Block from "@core/block/block";
// import { IBlock } from "@core/block/blok.interface";
// import ProofOfWork from "@core/block/workproof/proofofwork";
// import WorkProof from "@core/block/workproof/workproof";
// import CryptoModule from "@crypto/crypto.module";
// import DigitalSignature from "@core/transaction/digitalSignature";
// import { Receipt, Sender, TransactionRow, TxOut } from "@core/transaction/transaction.interface";
// import Transaction from "@core/transaction/transaction";
// import Unspent from "@core/transaction/unspentPool";

// const crypto = new CryptoModule();
// const proofofwork = new ProofOfWork(crypto);
// const digitalsignature = new DigitalSignature(crypto);
// const transaction = new Transaction(crypto);
// const workProof = new WorkProof(proofofwork);
// const block = new Block(crypto, workProof);
// const unspent = new Unspent();

// let BlockArray: IBlock[] = [GENESIS];
// let previousBlock = GENESIS;
// let adjustmentBlock = GENESIS;
// // console.log(BlockArray)

// // 제네시스

// // 코인 베이스
// const privateKey = "b29fc076f5e5e5c78efa4efe0110720bf3baf20250345d6fc00065f1537a2e50";
// const publicKey = digitalsignature.createPublicKey(privateKey);
// const account = digitalsignature.createAccount(publicKey);
// // TX들을 만들어야 함
// const coinbase2 = transaction.createCoinbase(account, GENESIS.height);
// const block2 = block.mine(GENESIS, [coinbase2], GENESIS);
// unspent.createUTXO(coinbase2);
// // 3번째 블록에 Transaction 넣기
// const receipt: Receipt = {
//     sender: {
//         // 보내는 사람
//         account,
//         publicKey,
//     },
//     received: "0".repeat(40), // 받는 사람
//     amount: 30,
//     signature: "0000",
// };
// // 보내는 사람의 amount 값이 30보다 많니
// // const myutxo = unspent.me(account)
// // console.log(myutxo)
// // const totalAmount =  unspent.getAmount(myutxo)
// // console.log(totalAmount)
// // if(unspent.isAmount(account, receipt.amount)) console.log("잔액부족")
// const flag = unspent.isAmount(account, receipt.amount);
// if (flag) console.log("잔액부족");

// // txin
// const input = unspent.getInput(receipt);
// console.log(input);

// const txin1 = transaction.createTxIn(1, "", receipt.signature);
// // txout
// // 연산 필요
// // 현재 보내는 사람은 50
// // 받는 사람 30
// // 보내는 사람의 잔액은 20
// // sender 총 수량 - amount
// // const txout_sender = transaction.createTxOut(receipt.sender.account, 50-receipt.amount )
// // const txout_received = transaction.createTxOut(receipt.received, receipt.amount)

// // const tx1 = transaction.createRow([txin1], [txout_sender, txout_received])
// const tx1 = transaction.create(receipt);
// const coinbase3 = transaction.createCoinbase(account, block2.height);
// const block3 = block.mine(block2, [coinbase3, tx1], GENESIS);
// // 영수증 -> 트랜잭션 -> block 생성

// // 50
// // 20 30

// // const txin =transaction.createTxIn()
// // const txout =transaction.createTxOut()

// // transaction.createRow()
// // account

// // GENESIS
// // block2 coinbase
// // block3 coinbase + transaction 1건에 대한 부분

// // for(let i =0;i<100; i++){
// //     if(i>=1){
// //         previousBlock = BlockArray[i];
// //     }
// //     if(i >= 21){
// //         adjustmentBlock = BlockArray[(Math.floor(i / 10)-1) *10 ]
// //     }
// //     // console.log(adjustmentBlock,i)
// //     BlockArray.push(block.createBlock(previousBlock, [transaction3], adjustmentBlock))
// // }

