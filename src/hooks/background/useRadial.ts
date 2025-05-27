import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";
import {
  PreviewRadialHandlerType,
  CreateRadialHandlerType,
} from "../../handlers/background/radial/radialHandlerType";

export function useRadial() {
  const [count, setCount] = useState<number | null>(10);
  const [radius, setRadius] = useState<number | null>(700);
  const [strokeWidth, setStrokeWidth] = useState<string>("700");
  const [strokeCap, setStrokeCap] = useState<
    "NONE" | "ROUND" | "SQUARE" | "ARROW_LINES" | "ARROW_EQUILATERAL"
  >("NONE");
  const [strokeJoin, setStrokeJoin] = useState<"MITER" | "BEVEL" | "ROUND">(
    "ROUND"
  );

  const [dashLength, setDashLength] = useState<string>("120");
  const [dashGap, setDashGap] = useState<string>("100");

  const minimum = 0;
  const maximum = 500;

  const [fillColor, setFillColor] = useState<string>("FF99FF");
  const [fillOpacity, setFillOpacity] = useState<string>("50");
  const [strokeColor, setStrokeColor] = useState<string>("FF00FF");
  const [strokeOpacity, setStrokeOpacity] = useState<string>("100");

  function handleDashLengthInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setDashLength(newValue);
    updatePreview();
  }

  function handleDashGapInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setDashGap(newValue);
    updatePreview();
  }

  function handleFillColorInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    setFillColor(event.currentTarget.value);
    updatePreview();
  }

  function handleFillOpacityInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setFillOpacity(event.currentTarget.value);
    updatePreview();
  }

  function handleStrokeColorInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setStrokeColor(event.currentTarget.value);
    updatePreview();
  }

  function handleStrokeOpacityInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setStrokeOpacity(event.currentTarget.value);
    updatePreview();
  }

  function handleStrokeWidthInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setStrokeWidth(event.currentTarget.value);
    updatePreview();
  }

  const updatePreview = useCallback(
    function () {
      if (radius !== null && strokeWidth !== null) {
        // Figmaプレビューも更新
        emit<PreviewRadialHandlerType>("PREVIEW_RADIAL", {
          radius,
          strokeWidth: Number(strokeWidth),
          strokeCap,
          strokeJoin,
          dashPattern: [Number(dashLength), Number(dashGap)],
          fillColor,
          fillOpacity: Number(fillOpacity),
          strokeColor,
          strokeOpacity: Number(strokeOpacity),
        });
      }
    },
    [
      radius,
      strokeWidth,
      strokeCap,
      strokeJoin,
      dashLength,
      dashGap,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
    ]
  );

  // キャンバスサイズを設定
  useEffect(() => {
    const canvas = document.getElementById(
      "previewCanvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      // デバイスピクセル比を考慮してキャンバスサイズを設定
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // スタイルでの表示サイズを設定
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
  }, []);

  const handleCreateButtonClick = useCallback(
    function () {
      if (count !== null && radius !== null && strokeWidth !== null) {
        emit<CreateRadialHandlerType>("CREATE_RADIAL", {
          radius,
          strokeWidth: Number(strokeWidth),
          strokeCap,
          strokeJoin,
          dashPattern: [Number(dashLength), Number(dashGap)],
          fillColor,
          fillOpacity: Number(fillOpacity),
          strokeColor,
          strokeOpacity: Number(strokeOpacity),
        });
      }
    },
    [
      radius,
      strokeWidth,
      strokeCap,
      strokeJoin,
      dashLength,
      dashGap,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
    ]
  );
  return {
    count,
    setCount,
    radius,
    setRadius,
    strokeWidth,
    strokeCap,
    setStrokeCap,
    strokeJoin,
    setStrokeJoin,
    dashLength,
    setDashLength,
    dashGap,
    setDashGap,
    fillColor,
    setFillColor,
    fillOpacity,
    setFillOpacity,
    strokeColor,
    setStrokeColor,
    strokeOpacity,
    setStrokeOpacity,
    handleDashLengthInput,
    handleDashGapInput,
    handleFillColorInput,
    handleFillOpacityInput,
    handleStrokeColorInput,
    handleStrokeOpacityInput,
    handleStrokeWidthInput,
    handleCreateButtonClick,
    minimum,
    maximum,
  };
}
