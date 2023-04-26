import { Difficulty, Hash, Height, Timestamp } from "types/block";
import { TransactionData } from "./transaction/transaction.interface";

export class BlockInfo {
    public version!: string;
    public height!: Height;
    public timestamp!: Timestamp;
    public previousHash!: Hash;
    public merkleRoot!: Hash;
    public nonce: number = 0;
    public difficulty: Difficulty = 0;
}

export class BlockData extends BlockInfo {
    public data!: TransactionData;
}

export class IBlock extends BlockData {
    public hash!: Hash;
}

