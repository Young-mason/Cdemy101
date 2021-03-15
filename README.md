## INTRO

글로벌 강의서비스 Udemy 의 UI를 참고하여 구현하였습니다 ! 

1440 X 1024 화면 사이즈에 최적화되어 있습니다 🙂 

`npm run start` 커맨드를 입력하셔서 `http://localhost:3001` 에서 실행하실 수 있습니다

사용한 기술 스택은 아래와 같습니다.

- Typescript, React( hooks , context API ), CSS

## Prototype ( feat. Figma )

작업 시작 전 프로토타이핑 툴 Figma 를 이용하여 기본적인 UI를 설계하였습니다

👉 [Figma URL](https://www.figma.com/file/WudnOVUyiSA0bXBQkvSuS6/Class101-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B3%BC%EC%A0%9C?node-id=0%3A1)

![proto](https://media.vlpt.us/images/young_mason/post/56693b11-dc4b-44ca-be05-a1cbf97f639d/image.png)

## 구현 사항

### 1. 상품 목록 페이지

[products](https://media.vlpt.us/images/young_mason/post/522a5346-d4c0-452e-bde7-d88ac9497ef2/cdemy_products.gif)

- Route :  `/products`
- 상품의 가격, 사진, 제목을 표시하였습니다.
- 상품의 Score를 기준으로 내림차순 정렬하여 5개씩 보여주는 페이지네이션을 구현하였습니다
    - [추가] 상품 페이지 전환시 슬라이드 효과를 구현하였습니다
- 장바구니 버튼을 구현하였습니다.
    - [추가] 장바구니 버튼을 누르면, 모달창이 생성됩니다.
    - 상품이 장바구니에 담겨 있지 않는 경우 `담기` 버튼이 활성화됩니다
    - 상품이 장바구니에 담겨 있는 경우 `빼기` 버튼이 활성화됩니다
    - [추가] 장바구니에 이미 3개가 담겨 있을 경우, 알림 메세지를 띄우고 장바구니 페이지로 이동시킵니다
- [추가] 화면 상단 헤더에서 장바구니 아이콘을 통해 장바구니 페이지로 이동할 수 있습니다. 아이콘에 현재 장바구니에 담겨있는 수량이 표시됩니다

### 2. 장바구니 페이지

[cart](https://media.vlpt.us/images/young_mason/post/1279a9a5-8057-403b-a2c8-96b14eebf3c1/cdemy_cart.gif)

- Route : `/cart`
- 장바구니의 상품 중 결제에 포함할 상품을 체크박스를 통해 선택하도록 하였습니다
- 장바구니에 담긴 상품의 수량을 선택할 수 있도록 하였습니다 (최소 1개)
- 최종 결제 금액에 대하여 쿠폰 적용 기능을 구현하였습니다
    - 비율할인, 정액할인을 선택할 수 있습니다
    - 할인 불가능한 상품들은 계산에서 제외합니다
- 최종 결제금액을 구현하였으며, 소수점은 버림처리하였습니다
- [추가] 삭제하기 버튼을 클릭하여 장바구니 페이지에서도 아이템을 삭제할 수 있습니다

## 컴포넌트 구조

![component](https://images.velog.io/images/young_mason/post/b1f52fc1-0606-46d7-b63b-0e0dfaabc191/image.png)

## Context API

### CartContext

- 장바구니에 담기는 상품들에 대한 Context 입니다.
- Cart 컴포넌트와, Products 컴포넌트에서 Context를 공유할 수 있도록 하였습니다.
- 이를 통해 장바구니 추가, 삭제 기능을 구현하였고,  아이템이 장바구니에 들어있는지 여부에 따라 담기버튼과 빼기 버튼이 활성화되도록 하였습니다.

### PaymentContext

- 결제할 아이템들을 담기 위한 Context입니다.
- Bill 컴포넌트와, CartItems 컴포넌트에서 Context를 공유할 수 있도록 하였습니다.
- 장바구니에 담긴 아이템들을 체크박스로 선택하면, Payment List에 담아주고, 이에따라 상품의 최종 가격을 계산합니다
