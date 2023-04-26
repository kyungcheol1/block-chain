import { GENESIS } from "@constants/block.constants";
import Block from "@core/block/block";

describe("Block", () => {
    let block: Block;
    beforeEach(() => {
        block = new Block();
    });

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

