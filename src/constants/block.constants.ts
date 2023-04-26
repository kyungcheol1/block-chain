import { IBlock } from "core/block/block.interface";

export const VERSION = "1.0.0";

export const GENESIS: IBlock = {
    version: VERSION, //언제 생성된건지 확인을 위한것
    height: 1,
    timestamp: 1231006506,
    previousHash: "0".repeat(64), // 이전블럭
    merkleRoot: "DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8", //transaction 들이 모인 hash값 string이긴 하지만 hash값이 될 것.
    nonce: 0, // POW 작업증명을 할 때 필요한 속성 계산할 때 필요 number
    difficulty: 0, // 작업증명을 할 때 사용할 속성값
    hash: "84ffab55c48e36cc480e2fd4c4bb0dc5ee1bb2d41a4f2a78a1533a8bb7df8370", //version mekleroot height 등등
    data: "2009년 1월 3일 더 타임스, 은행들의 두번째 구제금융을 앞두고 있는 U.K 재무장관", // transaction 들이 모일 곳 나중에 배열형태로 만들어질 것이다.
};

// export const GENESIS: IBlock = {
//     version: "1.0.0", //언제 생성된건지 확인을 위한것
//     height: 1,
//     timestamp: 1231006506,
//     previousHash: "0".repeat(64), // 이전블럭
//     merkleRoot: "DC24B19FB7508611ACD8AD17F401753670CFD8DD1BEBEF9C875125E98D82E3D8", //transaction 들이 모인 hash값 string이긴 하지만 hash값이 될 것.
//     nonce: 0, // POW 작업증명을 할 때 필요한 속성 계산할 때 필요 number
//     difficulty: 0, // 작업증명을 할 때 사용할 속성값
//     hash: "0".repeat(64), //version mekleroot height 등등
//     data: "2009년 1월 3일 더 타임스, 은행들의 두번째 구제금융을 앞두고 있는 U.K 재무장관", // transaction 들이 모일 곳 나중에 배열형태로 만들어질 것이다.
// };

//hash, merkleRoot, previousHash 의 경우 32byte, 64글자 짜리의 해시값들이 들어갈 곳이다

