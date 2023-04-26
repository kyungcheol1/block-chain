import { GENESIS } from "@constants/block.constants";
import { BlockInfo } from "@core/block/block.interface";
import CryptoModule from "@core/crypto/crypto.module";
import merkle from "merkle";

describe("CryptoModule", () => {
    let cryptoModule: CryptoModule;
    beforeEach(() => {
        cryptoModule = new CryptoModule();
    });

    describe("SHA256", () => {
        it("SHA256에 인자내용을 평문으로 해서 암호화가 되는가", () => {
            const data = "hello"; // 16진수로 뽑히게끔
            const result = cryptoModule.SHA256(data);
            expect(result.length).toBe(64);
        });
    });

    describe("createBlockHash", () => {
        it("SHA256에서 blockinfo 데이터로 암호화가 잘 되는가?", () => {
            //blockinfo를 넣기전에 data 속성을 빼기
            const blockinfo: BlockInfo = {
                version: GENESIS.version,
                height: GENESIS.height,
                timestamp: GENESIS.timestamp,
                previousHash: GENESIS.previousHash,
                merkleRoot: GENESIS.merkleRoot,
                nonce: GENESIS.nonce,
                difficulty: GENESIS.difficulty,
            };

            const hash = cryptoModule.createBlockHash(blockinfo);
            expect(hash).toHaveLength(64);
        });
    });

    describe("HashtoBinary", () => {
        it("이진데이터로 잘 변경 되는가", () => {
            const data = "hash";
            const hash = cryptoModule.SHA256(data);
            const binary = cryptoModule.hashToBinary(hash);
            //1니블 -> 4bit
            // 16 1자리

            expect(binary.length).toBe(256); // 64
        });
    });

    describe("merkleroot", () => {
        it("genesis 블럭에 있는 datat값에서 merkleroot 구하기", () => {
            const merkleroot = cryptoModule.merkleRoot(GENESIS.data);
            expect(merkleroot).toHaveLength(64);
        });
    });

    describe("isValidHash", () => {
        it("hash length 64 미만일 경우 ", () => {
            const hash = "63f276c89f94976122ea51f5826d8d45e336e332bd5259f6deedbc2c01be62a";
            expect(() => {
                cryptoModule.isValidHash(hash);
            }).toThrowError();
        });

        it("hash 값 옳바르지 않을 경우 ", () => {
            const hash = "63f276c89f94976122ea51f5826d8d45e336e332bd5259f6deedbc2c01be62H8";
            expect(() => {
                cryptoModule.isValidHash(hash);
            }).toThrowError();
        });
    });
});

