import ProofOfStake from "@core/block/wrorkproof/proofofstake";
import ProofofWork from "@core/block/wrorkproof/proofofwork";
import WorkProof from "@core/block/wrorkproof/workproof";
import { Proof } from "@core/block/wrorkproof/workproof.interface";
import CryptoModule from "@core/crypto/crypto.module";

describe("WorkPoof", () => {
    let workProof: WorkProof;
    let proof: Proof;
    let crypto: CryptoModule;

    describe("PRoofOfWork", () => {
        beforeEach(() => {
            proof = new ProofofWork(new CryptoModule());
            workProof = new WorkProof(proof);
        });
        it("console.log()", () => {
            workProof.run();
        });
    });

    describe("ProofOfStake", () => {
        beforeEach(() => {
            proof = new ProofOfStake();
            workProof = new WorkProof(proof);
        });
        it("console.log", () => {
            workProof.run();
        });
    });
});

