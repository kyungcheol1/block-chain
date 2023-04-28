import { Hash } from "types/block";
import cryptojs from "crypto-js";
import merkle from "merkle";
import { Receipt, TransactionData, TransactionRow } from "@core/transaction/transaction.interface";
import { BlockData, BlockInfo } from "@core/block/block.interface";

class CryptoModule {
    createBlockHash(data: BlockData) {
        const value = `${data.version}${data.height}${data.timestamp}${data.merkleRoot}${data.previousHash}${data.difficulty}${data.nonce}`;
        // const values = Object.values(data).sort().join("");
        return this.SHA256(value);
    }

    createReceiptHash(receipt: Receipt) {
        const {
            sender: { publicKey },
            received,
            amount,
        } = receipt;
        const message = [publicKey, received, amount].join("");
        return this.SHA256(message);
    }

    SHA256(data: string): Hash {
        const hash = cryptojs.SHA256(data).toString();
        return hash;
    }

    hashToBinary(hash: Hash): string {
        let binary = ""; //aabb
        for (let i = 0; i < hash.length; i += 2) {
            //hash의 length를 2글자씩 자른다 > 1bite로 자른다
            const hexByte = hash.substr(i, 2); //aa 2개 자른것
            const decimal = parseInt(hexByte, 16); //190 16진수로
            const binaryByte = decimal.toString(2).padStart(8, "0"); // 2진수로 채우는데 무조건 8글자 앞이 0이면 0 채우기
            binary += binaryByte;
        }
        return binary;
    }

    merkleRoot(data: TransactionData) {
        if (typeof data === "string") {
            return merkle("sha256").sync([data]).root();
        } else if (Array.isArray(data)) {
            const sync = data
                .filter((v) => {
                    if (!v.hash) return false;
                    else this.isValidHash(v.hash);
                    return true;
                })
                .map((v) => v.hash) as string[];
            return merkle("sha256").sync(sync).root();
        }
        // let merkleData = [];
        // if (data instanceof TransactionRow) {
        // } else {
        //     return merkle("sha256").sync([data]).root();
        // }
    }

    isValidHash(hash: Hash): void {
        const hexRegExp = /^[0-9a-fA-F]{64}$/;
        if (!hexRegExp.test(hash)) {
            throw new Error(`해시값이 옳바르지 않습니다 hash:${hash}`);
        }
    }
}

export default CryptoModule;

