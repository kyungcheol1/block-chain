import { BlockData, IBlock } from "../block.interface";
import ProofOfStake from "./proofofstake";
import ProofofWork from "./proofofwork";
import { Proof, ProofProps } from "./workproof.interface";

class WorkProof {
    constructor(private readonly Proof: Proof) {}
    run(blockData: BlockData, adjustmentBlock: IBlock) {
        const props: ProofProps = { blockData, adjustmentBlock };
        this.Proof.execute(props);
    }
}

// const work = new ProofofWork();
// // const work = new ProofOfStake();
// new WorkProof(work);
export default WorkProof;

