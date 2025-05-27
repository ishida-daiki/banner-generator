import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { CreateSparkleHandlerType } from "../handlers/sparkle/sparkleHandlerType";

interface ColorWithOpacity {
  color: string;
  opacity: number;
}

export function useSparkle() {
  const [count, setCount] = useState<string>("3");
  const [size, setSize] = useState<string>("24");
  const [isRandom, setIsRandom] = useState<boolean>(true);

  const [fillOpacity, setFillOpacity] = useState<string>("100");
  const [fillColor, setFillColor] = useState<string>("E9816B");

  // const [fillColors, setFillColors] = useState<string[]>(["E9816B"]);
  const [fillColors, setFillColors] = useState<ColorWithOpacity[]>([
    { color: "E9816B", opacity: 100 },
  ]);

  function handleFillColorInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    setFillColor(event.currentTarget.value);
  }

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
      emit<CreateSparkleHandlerType>("CREATE_SPARKLE", {
        count: countNum,
        size: parseInt(size),
        fillColors: fillColors.map((color) => color.color),
        fillOpacity: parseInt(fillOpacity),
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
    size,
    setSize,
    isRandom,
    setIsRandom,
    fillOpacity,
    setFillOpacity,
    fillColor,
    setFillColor,
    fillColors,
    setFillColors,
    handleFillColorInput,
    handleFillOpacityInput,
    handleCountInput,
    handleChange,
    handleCreateButtonClick,
    minimum,
    maximum
  };
}
