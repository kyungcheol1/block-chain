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

