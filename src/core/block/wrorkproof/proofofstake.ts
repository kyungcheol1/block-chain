import { IBlock } from "../block.interface";
import { Proof } from "./workproof.interface";

class ProofOfStake implements Proof {
    execute(): IBlock {
        return {} as IBlock;
    }
}

export default ProofOfStake;

