import {
  Button,
  Text,
  VerticalSpace,
  TextboxColor,
  Container,
  Bold,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";

import { CreateCircleHandler, PreviewCircleHandler } from "./type";

export function GradientComponent() {
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

  const updatePreview = useCallback(
    function () {
      if (radius !== null && strokeWidth !== null) {

        // Figmaプレビューも更新
        emit<PreviewCircleHandler>("PREVIEW_CIRCLE", {
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

  const handleCreateGradientButtonClick = useCallback(
    function () {
      if (count !== null && radius !== null && strokeWidth !== null) {
        emit<CreateCircleHandler>("CREATE_CIRCLE", {
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

  return (
    <div>
      <Container space="medium">
        <VerticalSpace space="extraSmall" />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "24px",
            }}
          >
            <Text>
              <Bold>color1</Bold>
            </Text>
          </div>
          <VerticalSpace space="extraSmall" />
          <TextboxColor
            hexColor={fillColor}
            onHexColorInput={handleFillColorInput}
            onOpacityInput={handleFillOpacityInput}
            opacity={fillOpacity}
          />
        </div>

        <VerticalSpace space="small" />

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "24px",
            }}
          >
            <Text>
              <Bold>base color</Bold>
            </Text>
          </div>
          <VerticalSpace space="extraSmall" />
          <TextboxColor
            hexColor={fillColor}
            onHexColorInput={handleFillColorInput}
            onOpacityInput={handleFillOpacityInput}
            opacity={fillOpacity}
          />
        </div>
      </Container>

      <VerticalSpace space="small" />

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "12px 16px 16px 16px",
          background: "var(--figma-color-bg)",
          borderTop: "1px solid var(--figma-color-border)",
          zIndex: 2,
        }}
      >
        <Button fullWidth onClick={handleCreateGradientButtonClick}>
          生成
        </Button>
      </div>
    </div>
  );
}
