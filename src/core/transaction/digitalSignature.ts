import CryptoModule from "@core/crypto/crypto.module";
import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { Receipt } from "./transaction.interface";

class DigitalSignature {
    private readonly ec = new elliptic.ec("secp256k1");
    constructor(private readonly crypto: CryptoModule) {}
    //목적 1.개인키 만들기 2. 공개키 만들기
    createPrivateKey() {
        return randomBytes(32).toString("hex");
    }

    createPublicKet(privateKey: string) {
        const keyPair = this.ec.keyFromPrivate(privateKey); //private 키를 객체화를 시킨것
        const publicKey = keyPair.getPublic().encode("hex", true);
        //.//endode("hex",true);
        return publicKey;
    }

    createAccount(publicKey: string) {
        const buffer = Buffer.from(publicKey);
        const account = buffer.slice(26).toString();
        return account;
    }

    sign(privateKey: string, receipt: Receipt): Receipt {
        const KeyPair = this.ec.keyFromPrivate(privateKey);
        //receipt 평문 제작해야함 객체의 모양이 다를 수 있기 때문에 >> 순서가 다를 수 있기 때문에 hash화를 시켜서 진행 ?
        const receiptHash = this.crypto.createReceiptHash(receipt);
        const signature = KeyPair.sign(receiptHash, "hex").toDER("hex");
        receipt.signature = signature;
        return receipt;
    }

    verify(receipt: Receipt): boolean {
        //공개키, 서명, 평문을 가지고 검증이 되었냐 안되었냐 평가 할것이다
        const {
            sender: { publicKey },
            signature,
        } = receipt;

        if (!publicKey || !signature) throw new Error("receipt에 값이 몇개 없습니다");
        const receiptHash = this.crypto.createReceiptHash(receipt);

        return this.ec.verify(receiptHash, signature, this.ec.keyFromPublic(publicKey, "hex"));
    }
}

export default DigitalSignature;

// Point {
//       curve: <ref *1> ShortCurve {
//         type: 'short',
//         p: BN { negative: 0, words: [Array], length: 10, red: null },
//         red: Red { m: [BN], prime: [K256] },
//         zero: BN { negative: 0, words: [Array], length: 1, red: [Red] },
//         one: BN { negative: 0, words: [Array], length: 1, red: [Red] },
//         two: BN { negative: 0, words: [Array], length: 1, red: [Red] },
//         n: BN { negative: 0, words: [Array], length: 10, red: null },
//         g: Point {
//           curve: [Circular *1],
//           type: 'affine',
//           precomputed: [Object],
//           x: [BN],
//           y: [BN],
//           inf: false
//         },
//         _wnafT1: [ <4 empty items> ],
//         _wnafT2: [ <4 empty items> ],
//         _wnafT3: [ <4 empty items> ],
//         _wnafT4: [ <4 empty items> ],
//         _bitLength: 256,
//         _maxwellTrick: true,
//         redN: BN { negative: 0, words: [Array], length: 10, red: [Red] },
//         a: BN { negative: 0, words: [Array], length: 1, red: [Red] },
//         b: BN { negative: 0, words: [Array], length: 1, red: [Red] },
//         tinv: BN { negative: 0, words: [Array], length: 10, red: [Red] },
//         zeroA: true,
//         threeA: false,
//         endo: { beta: [BN], lambda: [BN], basis: [Array] },
//         _endoWnafT1: [ <4 empty items> ],
//         _endoWnafT2: [ <4 empty items> ]
//       },
//       type: 'affine',
//       precomputed: null,
//       x: BN {
//         negative: 0,
//         words: [
//           12185358, 31142523, 56291294,
//           34292386, 19303330,  2160034,
//            7865067, 55661946, 57651618,
//            2951078,  4218638,        0,
//           31529131, 34382506,  2574921,
//           27970135, 34161794, 17221090,
//           51188309,     4119
//         ],
//         length: 10,
//         red: Red { m: [BN], prime: [K256] }
//       },
//       y: BN {
//         negative: 0,
//         words: [
//           60776524, 39198310, 20524979,
//            3297297, 64902789, 52225594,
//           65230266, 34211780, 63512409,
//             950666, 36769090,        0,
//           27615500, 44228623, 46254876,
//           31215695, 57460910, 21298952,
//           20572547,    35907
//         ],
//         length: 10,
//         red: Red { m: [BN], prime: [K256] }
//       },
//       inf: false
//     }

