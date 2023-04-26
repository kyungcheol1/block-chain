import { GENESIS } from "@constants/block.constants";
import Block from "@core/block/block";
import { IBlock } from "@core/block/block.interface";
import CryptoModule from "@core/crypto/crypto.module";

describe("Block", () => {
    let block: Block;
    let crypto: CryptoModule;
    beforeEach(() => {
        block = new Block(new CryptoModule());
    });

    describe("isValidBlock", () => {
        let previousBlock: IBlock;
        beforeEach(() => {
            previousBlock = { ...GENESIS };
        });
        it("매개변수에 넘겨받은 블럭해시값이 옳바른가", () => {
            expect(() => {
                block.isValidBlock(previousBlock);
            }).not.toThrowError();
        });

        it("매개변수에 넘겨받은 블록해시값이 옳바르지 않을경우 에러가 나오는가", () => {
            previousBlock.hash = "0000";
            expect(() => {
                block.isValidBlock(previousBlock);
            }).toThrowError();
        });
        it("block hash변경된적이 있는가", () => {
            block.isValidBlock(previousBlock);
        });
        it("블록해시값이 옳바르지 않을 때 에러가 발생이 되는가", () => {
            previousBlock.hash = "84ffab55c48e36cc480e2fd4c4bb0dc5ee1bb2d41a4f2a78a1533a8bb7df8371";
            expect(() => {
                block.isValidBlock(previousBlock);
            }).toThrowError();
        });
    });
    //테스트 작성 할 때 어떤 로직을 넣을지

    describe("createBlockInfo", () => {
        const previousBlock = GENESIS;

        it("createBlockHash 메서드가 존재하는가", () => {
            expect(typeof block.createBlockInfo).toBe("function");
        });

        it("createBlockHash", () => {
            const newBlock = block.createBlockInfo(previousBlock);
            expect(typeof newBlock).toBe("object");
        });

        it("createBlock 에서 BlockInfo 내용이 옳바른가", () => {
            const newBlock = block.createBlockInfo(previousBlock);
            expect(newBlock.previousHash).toBe(previousBlock.hash);
            expect(newBlock.height).toBe(previousBlock.height + 1);
        });
    });
});

