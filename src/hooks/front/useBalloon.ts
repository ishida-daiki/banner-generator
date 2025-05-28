import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { CreateBalloonHandlerType } from "../../handlers/front/balloon/balloonHandlerType";
import { ColorWithOpacity } from "../../types";

export function useBalloon() {
  const [count, setCount] = useState<string>("3");
  const [size, setSize] = useState<string>("24");
  const [isRandom, setIsRandom] = useState<boolean>(true);
  const [fillOpacity, setFillOpacity] = useState<string>("100");
  // const [fillColors, setFillColors] = useState<string[]>(["E9816B"]);
  const [fillColors, setFillColors] = useState<ColorWithOpacity[]>([
    { color: "E9816B", opacity: 100 },
  ]);


  function handleFillOpacityInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setFillOpacity(event.currentTarget.value);
  }

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

  function handleChange(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    setIsRandom(newValue);
  }

  const handleCreateButtonClick = useCallback(
    function () {
      const countNum = parseInt(count);
      console.log("fillColors:", fillColors);
      emit<CreateBalloonHandlerType>("CREATE_BALLOON", {
        count: countNum,
        size: parseInt(size),
        fillColors: fillColors,
        // fillOpacity: fillColors.map((color) => color.opacity),
        spreadRange: calculateSpreadRange(countNum),
        isRandom: isRandom,
      });
    },
    [count, size, fillColors, fillOpacity, isRandom]
  );

  const minimum = 0;
  const maximum = 20;
  return {
    count,
    isRandom,
    setIsRandom,
    fillOpacity,
    setFillOpacity,
    fillColors,
    setFillColors,
    handleFillOpacityInput,
    handleCountInput,
    handleChange,
    handleCreateButtonClick,
    minimum,
    maximum,
  };
}
