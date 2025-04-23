import {
  Button,
  Columns,
  Muted,
  Text,
  TextboxNumeric,
  VerticalSpace,
  RangeSlider,
  TextboxColor,
  Divider,
  Container,
  Bold,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";

import { CreateCircleHandler, PreviewCircleHandler } from "./type";

export function RadialComponent() {
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
        // プレビューキャンバスに描画
        // const canvas = document.getElementById(
        //   "previewCanvas"
        // ) as HTMLCanvasElement;
        // const ctx = canvas.getContext("2d");
        // if (ctx) {
        //   // キャンバスをクリア
        //   ctx.clearRect(0, 0, canvas.width, canvas.height);

        //   // 円の中心座標
        //   const centerX = canvas.width / 2;
        //   const centerY = canvas.height / 2;

        //   // スケールを調整（プレビューサイズに合わせる）
        //   const scale =
        //     Math.min(canvas.width, canvas.height) / (radius * 2 + strokeWidth);
        //   const scaledRadius = radius * scale;
        //   const scaledStrokeWidth = strokeWidth * scale;

        //   // 円を描画
        //   ctx.beginPath();
        //   ctx.arc(centerX, centerY, scaledRadius, 0, Math.PI * 2);

        //   // 背景色を設定
        //   ctx.fillStyle = `#${fillColor}${Math.round(Number(fillOpacity) * 2.55)
        //     .toString(16)
        //     .padStart(2, "0")}`;
        //   ctx.fill();

        //   // 線の設定
        //   ctx.strokeStyle = `#${strokeColor}${Math.round(
        //     Number(strokeOpacity) * 2.55
        //   )
        //     .toString(16)
        //     .padStart(2, "0")}`;
        //   ctx.lineWidth = scaledStrokeWidth;

        //   // 破線の設定
        //   if (Number(dashLength) > 0 || Number(dashGap) > 0) {
        //     ctx.setLineDash([
        //       Number(dashLength) * scale,
        //       Number(dashGap) * scale,
        //     ]);
        //   }

        //   // 線を描画
        //   ctx.stroke();
        // }

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

  const handleCreateButtonClick = useCallback(
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
      <VerticalSpace space="large" />

      <Container space="medium">
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
              <Bold>Stroke width</Bold>
            </Text>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <RangeSlider
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashLengthInput}
              value={dashLength}
            />
            <TextboxNumeric
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashLengthInput}
              value={dashLength}
              style={{ width: "40px" }}
            />
          </div>
        </div>

        <VerticalSpace space="medium" />

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
              <Bold>Gap</Bold>
            </Text>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <RangeSlider
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashGapInput}
              value={dashGap}
            />
            <TextboxNumeric
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashGapInput}
              value={dashGap}
              style={{ width: "40px" }}
            />
          </div>
        </div>

        <VerticalSpace space="medium" />

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
              <Bold>Elipse size</Bold>
            </Text>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <RangeSlider
              maximum={1000}
              minimum={minimum}
              onInput={handleStrokeWidthInput}
              value={strokeWidth}
            />
            <TextboxNumeric
              maximum={1000}
              minimum={minimum}
              onInput={handleStrokeWidthInput}
              value={strokeWidth}
              style={{ width: "40px" }}
            />
          </div>
        </div>
      </Container>

      <VerticalSpace space="small" />
      <Divider />
      <VerticalSpace space="small" />

      <Container space="medium">
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
              <Bold>Background color</Bold>
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

        <VerticalSpace space="medium" />

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
              <Bold>Stroke color</Bold>
            </Text>
          </div>
          <VerticalSpace space="extraSmall" />
          <TextboxColor
            hexColor={strokeColor}
            onHexColorInput={handleStrokeColorInput}
            onOpacityInput={handleStrokeOpacityInput}
            opacity={strokeOpacity}
          />
        </div>
      </Container>

      <VerticalSpace space="large" />

      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCreateButtonClick}>
          生成
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </div>
  );
}
