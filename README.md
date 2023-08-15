# Modal with Zustand

modal을 zustand 전역 상태로 관리하는 프로젝트

### 커스텀 훅 요구사항

- `open: () => void`: 모달을 여는 함수. 모달이 mount
- `close: () => void`: 모달을 닫는 함수. 모달이 unmount
- 커스텀 훅

```javascript
useOverlay(options) => {
  open: (overlayElement: CreateOverlayElement) => void;
  close: () => void;
  exit: () => void;
}
```

- `Alert`은 반환할 값이 없지만, `window.confirm`이나 `window.propmpt`는 반환해야 하는 값이 있다



## Modal 요구사항

| 기능                     | 설명                                                         | 단축키       |
| ------------------------ | ------------------------------------------------------------ | ------------ |
| 모달 열릴 때 포커스 이동 | 모달이 열리면 현재 포커스 위치를 저장하고, 모달 내의 포커스 가능한 요소 중 **첫 번째 요소로 포커스 이동** |              |
| 다음 요소 탐색           | 모달 내의 포커스 가능한 요소 중 **다음 요소로 포커스이동**. (현재 위치가 마지막 요소면 처음 요소로 이동) | `Tab`        |
| 이전 요소 탐색           | 모달 내의 포커스 가능한 요소 중 **이전 요소로 포커스 이동**. (현재 위치가 처음 요소면 마지막 요소로 이동) | `Shift+ Tab` |
| 모달 닫기                | 모달의 외부를 클릭하거나 단축키를 눌러 모달을 닫는다.        | `Escape`     |
| 모달 닫힐 때 포커스 이동 | 모달이 닫히면 모달이 열리기 전의 포커스 위치로 포커스를 복귀 |              |





## 참고 자료

https://developer.mozilla.org/ko/docs/Web/API/Window/alert

https://developer.mozilla.org/ko/docs/Web/API/Window/confirm

https://developer.mozilla.org/ko/docs/Web/API/Window/prompt

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role

https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/tabindex

https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/
