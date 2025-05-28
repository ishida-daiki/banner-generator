import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { CreateConfettiHandlerType } from "../../handlers/front/confetti/confettiHandlerType";
import { ColorWithOpacity } from "../../types";

export function useConfetti() {
  const [count, setCount] = useState<string>("10");
  const [size, setSize] = useState<string>("24");
  const [isRandom, setIsRandom] = useState<boolean>(true)
  const [fillColors, setFillColors] = useState<ColorWithOpacity[]>([
    { color: "E9816B", opacity: 100 },
  ]);

  // カウントを入力する
  function handleCountInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setCount(newValue);
  }

  // カウントに基づいて散布範囲を計算する関数
  const calculateSpreadRange = (count: number) => {
    // 基本の範囲を150とし、要素数に応じて調整
    const baseRange = 150;
    const scaleFactor = Math.sqrt(count / 10); // 10個を基準として調整
    return baseRange * scaleFactor;
  };

  // ランダムに設定するかどうかを切り替える
  function handleChange(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    setIsRandom(newValue);
  }

  // 生成ボタンをクリックする
  const handleCreateButtonClick = useCallback(
    function () {
      const countNum = parseInt(count);
      emit<CreateConfettiHandlerType>("CREATE_CONFETTI", {
        count: countNum,
        size: parseInt(size),
        fillColors: fillColors,
        spreadRange: calculateSpreadRange(countNum),
        isRandom: isRandom,
      });
    },
    [count, size, fillColors, isRandom]
  );

  // 最小値と最大値を設定
  const minimum = 0;
  const maximum = 200;

  return {
    count,
    size,
    setSize,
    isRandom,
    setFillColors,
    fillColors,
    handleCountInput,
    handleChange,
    handleCreateButtonClick,
    minimum,
    maximum,
  };
}
