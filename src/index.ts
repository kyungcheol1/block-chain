import { GENESIS } from "@constants/block.constants";
import Block from "@core/block/block";
import ProofofWork from "@core/block/wrorkproof/proofofwork";
import WorkProof from "@core/block/wrorkproof/workproof";
import CryptoModule from "@core/crypto/crypto.module";

const crypto = new CryptoModule();

const proofofwork = new ProofofWork(crypto);
const workproof = new WorkProof(proofofwork);
const block = new Block(crypto, workproof);

const block1 = block.createBlock(GENESIS, "asdfasdf", GENESIS);
console.log(block1);

