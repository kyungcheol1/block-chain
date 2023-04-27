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

