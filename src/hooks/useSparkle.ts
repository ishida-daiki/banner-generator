import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { CreateSparkleHandler } from "../types";

interface ColorWithOpacity {
  color: string;
  opacity: number;
}

export function useSparkle() {
  const [count, setCount] = useState<string>("10");
  const [size, setSize] = useState<string>("24");
  const [isRandom, setIsRandom] = useState<boolean>(true);
  const [fillOpacity, setFillOpacity] = useState<string>("100");
  const [fillColors, setFillColors] = useState<ColorWithOpacity[]>([
    { color: "E9816B", opacity: 100 },
  ]);

  const handleCountInput = useCallback(function (
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;
    setCount(newValue);
  },
  []);

  const handleSizeInput = useCallback(function (
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;
    setSize(newValue);
  },
  []);

  const handleRandomChange = useCallback(function (
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.checked;
    setIsRandom(newValue);
  },
  []);

  const handleOpacityInput = useCallback(function (
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;
    setFillOpacity(newValue);
  },
  []);

  const handleAddColor = useCallback(
    function () {
      setFillColors([...fillColors, { color: "E9816B", opacity: 100 }]);
    },
    [fillColors]
  );

  const handleColorChange = useCallback(
    function (index: number, newColor: string) {
      const newColors = [...fillColors];
      newColors[index] = { ...newColors[index], color: newColor };
      setFillColors(newColors);
    },
    [fillColors]
  );

  const handleOpacityChange = useCallback(
    function (index: number, newOpacity: number) {
      const newColors = [...fillColors];
      newColors[index] = { ...newColors[index], opacity: newOpacity };
      setFillColors(newColors);
    },
    [fillColors]
  );

  const handleRemoveColor = useCallback(
    function (index: number) {
      const newColors = fillColors.filter((_, i) => i !== index);
      setFillColors(newColors);
    },
    [fillColors]
  );

  const handleCreateButtonClick = useCallback(
    function () {
      const countNum = parseInt(count);
      emit<CreateSparkleHandler>("CREATE_SPARKLE", {
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

  const calculateSpreadRange = (count: number) => {
    const baseRange = 150;
    const scaleFactor = Math.sqrt(count / 10);
    return baseRange * scaleFactor;
  };

  return {
    count,
    size,
    isRandom,
    fillOpacity,
    fillColors,
    handleCountInput,
    handleSizeInput,
    handleRandomChange,
    handleOpacityInput,
    handleAddColor,
    handleColorChange,
    handleOpacityChange,
    handleRemoveColor,
    handleCreateButtonClick,
  };
}
