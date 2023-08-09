# Modal with Zustand

modal을 zustand 전역 상태로 관리하는 프로젝트



### 요구사항

- `isopen:boolean` : 모달이 열려 있는 상태인지를 확인하는 변수
- `open: () => void`: 모달을 여는 함수. 모달이 mount ( isopen: true가 된다)
- `close: () => void`: 모달을 닫는 함수. 모달이 unmount (isopen: false가된다)
- 커스텀 훅

```javascript
useOverlay(options) => {
  open: (overlayElement: CreateOverlayElement) => void;
  close: () => void;
  exit: () => void;
}
```

