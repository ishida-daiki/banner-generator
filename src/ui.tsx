import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
  RangeSlider,
  TextboxColor,
  Stack,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";

import {
  CloseHandler,
  CreateRadialHandler,
  CreateCircleHandler,
  PreviewCircleHandler,
} from "./types";

function Plugin() {
  const [count, setCount] = useState<number | null>(10);
  const [countString, setCountString] = useState("10");
  const [radius, setRadius] = useState<number | null>(700);
  const [strokeWidth, setStrokeWidth] = useState<string>("400");
  const [strokeCap, setStrokeCap] = useState<
    "NONE" | "ROUND" | "SQUARE" | "ARROW_LINES" | "ARROW_EQUILATERAL"
  >("NONE");
  const [strokeJoin, setStrokeJoin] = useState<"MITER" | "BEVEL" | "ROUND">(
    "ROUND"
  );

  const [dashLength, setDashLength] = useState<string>("30");
  const [dashGap, setDashGap] = useState<string>("30");

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

  // 初期プレビューを表示
  // useEffect(() => {
  //   updatePreview();
  // }, [updatePreview]);

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

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);

  return (
    <Stack space="small">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "200px",
          backgroundColor: "var(--figma-color-bg-brand-tertiary)",
        }}
      >
        <canvas
          id="previewCanvas"
          width="180"
          height="180"
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        />
      </div>
      <Container space="medium">
        <VerticalSpace space="large" />

        <div>
          <Text>
            <Muted>破線</Muted>
          </Text>
          <VerticalSpace space="small" />
          <RangeSlider
            maximum={maximum}
            minimum={minimum}
            onInput={handleDashLengthInput}
            value={dashLength}
          />
          <VerticalSpace space="small" />
          <TextboxNumeric
            maximum={maximum}
            minimum={minimum}
            onInput={handleDashLengthInput}
            value={dashLength}
          />
        </div>

        <VerticalSpace space="large" />

        <div>
          <Text>
            <Muted>間隔</Muted>
          </Text>
          <VerticalSpace space="small" />
          <RangeSlider
            maximum={maximum}
            minimum={minimum}
            onInput={handleDashGapInput}
            value={dashGap}
          />
          <VerticalSpace space="small" />
          <TextboxNumeric
            maximum={maximum}
            minimum={minimum}
            onInput={handleDashGapInput}
            value={dashGap}
          />
        </div>

        <VerticalSpace space="large" />

        <div>
          <Text>
            <Muted>strokeWidth</Muted>
          </Text>
          <VerticalSpace space="small" />
          <RangeSlider
            maximum={1000}
            minimum={minimum}
            onInput={handleStrokeWidthInput}
            value={strokeWidth}
          />
          <VerticalSpace space="small" />
          <TextboxNumeric
            maximum={1000}
            minimum={minimum}
            onInput={handleStrokeWidthInput}
            value={strokeWidth}
          />
        </div>

        <VerticalSpace space="large" />

        <div>
          <Text>
            <Muted>背景色</Muted>
          </Text>
          <VerticalSpace space="small" />
          <TextboxColor
            hexColor={fillColor}
            onHexColorInput={handleFillColorInput}
            onOpacityInput={handleFillOpacityInput}
            opacity={fillOpacity}
          />
        </div>

        <VerticalSpace space="large" />

        <div>
          <Text>
            <Muted>線の色</Muted>
          </Text>
          <VerticalSpace space="small" />
          <TextboxColor
            hexColor={strokeColor}
            onHexColorInput={handleStrokeColorInput}
            onOpacityInput={handleStrokeOpacityInput}
            opacity={strokeOpacity}
          />
        </div>

        <VerticalSpace space="large" />

        <Columns space="extraSmall">
          <Button fullWidth onClick={handleCreateButtonClick}>
            生成
          </Button>
        </Columns>
        <VerticalSpace space="small" />
      </Container>
    </Stack>
  );
}

export default render(Plugin);
