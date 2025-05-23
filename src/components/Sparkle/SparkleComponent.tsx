import {
  Button,
  Text,
  TextboxNumeric,
  VerticalSpace,
  RangeSlider,
  TextboxColor,
  Divider,
  Bold,
  IconButton,
  IconPlus24,
  IconBorderSmallSmall24,
  IconEyeSmall24,
  Toggle,
  Container,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { CreateSparkleHandler } from "../../types";

interface ColorWithOpacity {
  color: string;
  opacity: number;
}

export function SparkleComponent() {
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

  const minimum = 0;
  const maximum = 20;

  return (
    <div>
      <Container space="medium">
        <VerticalSpace space="extraSmall" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "24px",
            marginBottom: "4px",
          }}
        >
          <Text>
            <Bold>Count</Bold>
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <RangeSlider
            maximum={maximum}
            minimum={minimum}
            onInput={handleCountInput}
            value={count}
          />
          <TextboxNumeric
            maximum={maximum}
            minimum={minimum}
            onInput={handleCountInput}
            value={count}
            style={{ width: "40px" }}
          />
        </div>
      </Container>

      <VerticalSpace space="small" />
      <Divider />
      <VerticalSpace space="extraSmall" />

      <div>
        <Container space="medium">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>
              <Bold>Color</Bold>
            </Text>
            <VerticalSpace space="extraSmall" />
            <IconButton
              onClick={() =>
                setFillColors([
                  ...fillColors,
                  { color: "E9816B", opacity: 100 },
                ])
              }
            >
              <IconPlus24 />
            </IconButton>
          </div>
          <VerticalSpace space="extraSmall" />
          <div
            style={{
              height: "236px",
              overflowY: "auto",
              paddingRight: "12px",
              marginRight: "-12px", // スクロールバーのスペースを確保
            }}
          >
            {fillColors.map((color, index) => (
              <div key={index}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <TextboxColor
                    hexColor={color.color}
                    onHexColorInput={(
                      event: h.JSX.TargetedEvent<HTMLInputElement>
                    ) => {
                      const newColors = [...fillColors];
                      newColors[index] = {
                        ...newColors[index],
                        color: event.currentTarget.value,
                      };
                      setFillColors(newColors);
                    }}
                    onOpacityInput={(
                      event: h.JSX.TargetedEvent<HTMLInputElement>
                    ) => {
                      const newColors = [...fillColors];
                      newColors[index] = {
                        ...newColors[index],
                        opacity: parseInt(event.currentTarget.value),
                      };
                      setFillColors(newColors);
                    }}
                    opacity={String(color.opacity)}
                  />
                  {fillColors.length > 1 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          const newColors = fillColors.filter(
                            (_, i) => i !== index
                          );
                          setFillColors(newColors);
                        }}
                      >
                        <IconEyeSmall24 />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          const newColors = fillColors.filter(
                            (_, i) => i !== index
                          );
                          setFillColors(newColors);
                        }}
                      >
                        <IconBorderSmallSmall24 />
                      </IconButton>
                    </div>
                  )}
                </div>
                <VerticalSpace space="extraSmall" />
              </div>
            ))}
          </div>
        </Container>
      </div>

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
        <Toggle onChange={handleChange} value={isRandom}>
          <Text>ランダムに設定する</Text>
        </Toggle>

        <VerticalSpace space="small" />

        <div style={{ width: "100%" }}>
          <Button fullWidth onClick={handleCreateButtonClick}>
            生成
          </Button>
        </div>
      </div>
    </div>
  );
}
