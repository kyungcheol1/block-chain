블록체인 관련 chatGPT 검색 유의,,, 맞는것 반 틀린거 반 이중검색하기

# Bitcoin

블록체인 생태계를 이해하기 위한 첫 걸음

백서
기준

비트코인을 구현 하는데

1. TCP 구현이 완벽하게 해야 하기 때문에 힘들고
2. 비트단위의 연산이 되야하는데 js 에서는 힘들다
3. 시간이 부족하다 코어개발을 하려면 모든 비트코인 코드를 이해해야 한다 > 이더리움 기반으로 코드를 고쳐서 개발한다 보통

큰 흐름을 파악하면 대부분 쉽다.. 늘 큰 흐름이 문제다

순수한 개인 대 개인(금융기간을 거치지 않고) A, B에게 온라인 결제를 실현

> 전자서명을 활용 이중 지불을 막음(막기위해 작업 증명 을 만듬)

16진수 32바이트 asdf > sha256

# 1. Typescript 설정

{
"compilerOptions": {
"module": "commonJS",
"outDir": "dist",
"target": "ES6",
"esModuleInterop": true, // import React form 'react'
"moduleResolution": "node",
"resolveJsonModule": true,
"strict": true,
"typeRoots": ["node_modules/@types", "src/@types"],
"types": ["jest"],
"baseUrl": "./src",
"paths": {
"@/_": ["_"],
"@types/_": ["types/_"],
"@core/_": ["core/_"],
"@exception/_": ["exceptions/_"]
}
},
"include": ["./src/**/*", "@types/*"],
"exclued": ["node_modules", "**/*.test.ts"]
}

npm init -y
npm i tsc-alias tsconfig-paths nodemon

# 2. Jest 설정

1. jest는 프레임워크긴 하지만 실행기다 < jest도 config파일이 원래 존재한다 default 값이 filename.test.확장자 를 찾아서 실행시킨다.>
   jest > 의존 주입 > node를 통해 전부 다 실행시킴
   jest > 파일 목록을 보고 node를 붙여 실행시켜준다.

jest = 프레임워크 테스트 코드를 관리해주는 라이브러리

TDD 개념

npm install -D jest @types/jest ts-jest

npm jest를 통해서 실행 >> jest 내부에 가진 모듈을 가져와서 실행을 시킨다. 자세하게는 모른다.

@type > interface등을 모아놓은 라이브러리

npx jest --preset ts-jest
typescript 환경으로 실행하는 jest 가 실행되도록

--testEnvironment node
..?? 10:18

```json
    "jest": {
        "preset": "ts-jest",
        "testEnvironment": "node",
        "globals": {
            "transform": {
                ".ts": "ts-jest"
            },
            "ts-jest": {
                "tsconfig": "tsconfig.json"
            }
        }
    }
```

::12:40분부터 다시보기

# TDD는 기본적으로 테스트 코드 먼저 작성해야한다

test 코드 작성 > 뭘 테스트 할 지 > 빈 클래스 작성 > path 작성 > model >repository > service > controller 순으로 작성하는것이 좋음
expect
toBe() 값이 동일한지 확인
toEqual() 두 객체의 값이 같은지 확인 tobe와 다르게 객체를 깊게 비교할 때 사용
toBeCalled() 함수가 호출되었는지를 확인
toBeCalledWith(123) 함수가 특정 인자와 함께 호출되었는지를 확인하는 것
.toBeTruthy() 값이 true인지 확인

.jest.fn() 가상의 함수를 만들어서 실행시키는 역할을 한다.
.mockReturunValue() > 단순한 리턴 값을 받아오는 것
.mockResolvedValue() > promise 리턴 값을 받아오는 것

## BlockChain

블록체인 네트워크

Block 데이터를 저장하는 블럭 , 제네시스블럭 > 최초의 데이터를 담을 블럭 이전 블럭이 없기 때문에 임의의 값을 채워놓고 기준을 삼고 블럭을 쌓아간다. 내 네트워크 중에 제네시스가 1이면 1인 사람들끼리만 모일 수 있는 구조.상당히 중요하다.
속성값들이 하나의 블럭
제네시스 블럭이 어떻게 생겨먹은건지 볼 것이다.
Chain

평문을 사용해서 hash를 만드는데 blockinfo를 가지고 Hash를 만들게 된다.
blockinfo가 만들어지고 hash를 뽑아내는 것
hash > 내가 가지고 있는 데이터를 가지고 암호화를 하는것이기 때문에

새로운 블럭을 만들 때는 이전 블럭의 데이터가 필요하다 > difficulty와 previousHash 가 필요하기 떄문이다.
, data 란에는 다양한 데이터들이 들어간다.

npm i crypto-js
암호화를 하기 위한 것

//16진수 왜 쓰기 시작했냐 ? 변환하기 쉽기 때문에 > 컴퓨터가
0000 0000
01010101 을 > 읽기 편하게 바꾸기 위해서 16진수로 바꾼다.
helloworld > hex > binary // 이건 무조건 이해해야한다

merkleroot 정리 해보기
npm i merkle

머클루트가 데이터를 이미 검증해주기 때문에 데이타 내용은 빼고 해시화를 시작한다

해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시해시

block >> data를 담는게 block >> transaction >> block에 데이터를 담는것

4.26~

## block 생성

hashtobinary 부분을 알아야 block생성 부분은 편해진다

제네시스 블럭에서 부터 생성되어지는 블럭들을 만드는것

> 이전 블럭에 대한 내용을 알고 있어야 한다.

마지막 블럭에 대한 정보를 알고 있어야한다. 이전블럭의 해시값을 찾아서 넣어줘야 한다.
트랜잭션 내용들 >> 블럭 생성을 위해서는 merkleroot 값을 완성해야한다 .

생성 준비단계가 있음 트랜잭션을 어느정도를 가지고 블럭을 생성 하겠다는 결정 단계
해시값을 제외한 모든 값은 완성되어 있어야 한다.

처음 채워지는 값 previoushash > merkleroot
생성준비단계 끝
hash와 nonce 값을 가지고 마이닝 단계

## 4. 27

블록 생성

POW, POS, POA ...등등 있다, 어떤 목적을 가지고 이루어 지는지를 알면 된다. 내가 블럭을 만들 수 있는 사람인가 아닌가를 증명
많아야 트랜젝션이 원활하게 이루어진다?
POW 구현할거다, 구글링 검색 추천 (Proof of Work) 작업증명 너무 컴퓨터 파워를 많이 쓰다 보니 자원의 효울이 떨어짐
POS (Proof of Stake) 지분증명 코인을 많이 가진 사람이 블럭 만들 수 있음
POA (Proof of Authority) 권한증명 선택한 사람만 블럭 생성 가능

block hash 를 만드는것이 -> 블럭 생성
// hex-> binary 앞에 0이 몇개 붙어있는가 를 기준으로
block 생성 시간 기준으로 1개당 10분으로 생성되게 만든다
// 몇번째 블럭이랑 비교할것인가?
10번째 블럭과 비교 현재 블럭과 10번째 전 블럭이 있어야 해시를 만들 수 있다.

블록체인

-   public
-   private 보안성 신뢰성 속도 노드 갯수가 현저히 떨어짐 속도는 빠르고 보안이 약함 (하이퍼레저) DID 인증

등이 존재한다.

체인 >
블록에서 저장하고 , 꺼내쓰는 메서드들을 모아놓은 곳 ?

블록 > 체인 > 통신 > p2p > 트랜젝션 > 지갑

## Transaction

서명 - 자신임을 증명하는것

블록체인 > 패스워드는 저장하지 않지만 내가 나 임은 증명하고 있다. > 수학을 통해 증명한다

개인키 공개키

대칭키

서로 대칭키를 이용해서 암호화 복호화

비대칭키

> 암호화 할 때 비밀키로 > 복호화 할 때 공개키로
> 비밀키와 공개키는 키페어

개인키를 만들고 공개키도 만들어야 한다.

동전을 256번을 던지고 앞 0 뒤 1

2^256 10^70 정도 된다 확률

이 방식으로 개인키를 만든다

256bit > 32byte 해시값 이 된다.

개인키를 만들고 개인키 기반으로 공개키를 만듦

SECP256K

월렛의 주된 목적 ? 개인기 보관용도 개인키는 노출이 되서는 안되기 때문에

통신을 위한 기능

메타마스크 ?
내 하드에 개인키를 가지고 있는다 >

마이닝 될 때까지 내 영수증이 처리 되지 않는다> 영수증이 맞는지 블록체인에서 먼저 검증하고
맞다면 트랜젝션을 만든다 트렌젝션 풀에 들어간다. > 트랜젝션 풀에서 트랜젝션 가져와서 merkleroot 만든다.

모든 트랙젝션 내용들이 다음 블럭에 담긴다 > 그때부터 거래가 완료 된다.

개인키 > 공인인증서 느낌
공개키 > 계좌 비밀번호 정도의 느낌

const signature = KeyPair.sign("평문","hex").toDER("hex")

전자서명

내가 나 임을 증명하는 방법 타원곡선 관련해서 사용했다

트랜젝션을 구현한것이 아니라 트랜젝션이 일어나기 전에 이 데이터가 맞는지를 확인하는 것만 했다.

node 라는 것에
블럭들이 담겨있다. 각 블럭에 해시값들이 있고 이걸 나열해놓은것이 체인이이다.

1. 사용자 검증

2. 사용자 잔액 확인 > 블럭들에 있는 정보를 가지고 입금 출금 내역을 가지고 잔액을 구하는 것 > 블럭 안에 있는 트랜젝션 내용을 가지고 판단

3. 트랜젝션 생성 (서로의 자산을 높이고 낮추는 작업)

4. 트렌젝션을 완료했을 때 거래가 완료가 된다.

요청 > 트랜젝션(객체)> 트랜젝션 풀에 저장

요청 > 네트워크

```ts
serilizeTx<T>(data: T[], callback: (item: T) => string) {
        return data.reduce((acc: string, v: T) => {
            return acc + callback(v); //this가 이 함수 안에 있는 this를 바라보기 때문에 crypto를 찾을 수 없다.// class 에 대한 this를 찾지 않는다.
        }, "");
    }

    serilizeRow(row: TransactionRow) {
        const { txIns, txOuts } = row;
        if (!txIns || !txOuts) throw new Error("형태가 옳바르지 않습니다");

        const text1 = this.serilizeTx<TxOut>(txOuts, this.serializeTxOut);
        const text2 = this.serilizeTx<TxIn>(txIns, this.serializeTxIn);
    }
```

this가 바뀌기 때문에 >> express에서도 한 번 했었던 개념

(item) => this.serializeTxIn(item) 애로우 함수로 만들거나,
고차함수로 만드는 방법이 있다.

txin > 잔액 확인이 필요하다
UTXO 사용하기 때문에 필요한 개념
