import { Hash } from "types/block";
import cryptojs from "crypto-js";
import merkle from "merkle";
import { TransactionData, TransactionRow } from "@core/block/transaction/transaction.interface";
import { BlockInfo } from "@core/block/block.interface";

class CryptoModule {
    createBlockHash(data: BlockInfo) {
        const values = Object.values(data).sort().join("");
        return this.SHA256(values);
    }

    SHA256(data: string): Hash {
        const hash = cryptojs.SHA256(data).toString();
        return hash;
    }

    hashToBinary(hash: Hash): string {
        let binary = "";
        for (let i = 0; i < hash.length; i += 2) {
            //hash의 length를 2글자씩 자른다 > 1bite로 자른다
            const hexByte = hash.substr(i, 2);
            const decimal = parseInt(hexByte, 16);
            const binaryByte = decimal.toString(2).padStart(8, "0");
            console.log(binaryByte);
            binary += binaryByte;
        }
        return binary;
    }
    merkleRoot(data: TransactionData) {
        let merkleData = [];
        if (data instanceof TransactionRow) {
        } else {
            return merkle("sha256").sync([data]).root();
        }
    }

    isValidHash(hash: Hash): void {
        const hexRegExp = /^[0-9a-fA-F]{64}$/;
        if (!hexRegExp.test(hash)) {
            throw new Error(`해시값이 옳바르지 않습니다 hash:${hash}`);
        }
    }
}

export default CryptoModule;

