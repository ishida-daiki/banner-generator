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
  IconButton,
  IconPlus24,
  IconTrash24,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { CreateConfettiHandler } from "../../types";

interface ColorWithOpacity {
  color: string;
  opacity: number;
}

export function ConfettiComponent() {
  const [count, setCount] = useState<string>("10");
  const [size, setSize] = useState<string>("24");

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

  // const handleAddColor = useCallback(
  //   function () {
  //     setFillColors([...fillColors, { color: "E9816B", opacity: 100 }]);
  //   },
  //   [fillColors]
  // );

  const handleCreateButtonClick = useCallback(
    function () {
      emit<CreateConfettiHandler>("CREATE_CONFETTI", {
        count: parseInt(count),
        size: parseInt(size),
        fillColors: fillColors.map((color) => color.color),
        fillOpacity: parseInt(fillOpacity),
      });
    },
    [count, size, fillColors, fillOpacity]
  );

  const minimum = 0;
  const maximum = 500;

  return (
    <div>
      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>Count</Muted>
        </Text>
        <VerticalSpace space="small" />
        <RangeSlider
          maximum={maximum}
          minimum={minimum}
          onInput={handleCountInput}
          value={count}
        />
        <VerticalSpace space="small" />
        <TextboxNumeric
          maximum={maximum}
          minimum={minimum}
          onInput={handleCountInput}
          value={count}
        />
      </div>

      <VerticalSpace space="large" />
      <Divider />
      <VerticalSpace space="large" />

      <div>
        {fillColors.map((color, index) => (
          <div key={index}>
            <Text>
              <Muted>Color {index + 1}</Muted>
            </Text>
            <VerticalSpace space="extraSmall" />
            <div style={{ display: "flex", alignItems: "center" }}>
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
                <IconButton
                  onClick={() => {
                    const newColors = fillColors.filter((_, i) => i !== index);
                    setFillColors(newColors);
                  }}
                >
                  <IconTrash24 />
                </IconButton>
              )}
            </div>
            <VerticalSpace space="medium" />
          </div>
        ))}
        <IconButton
          onClick={() =>
            setFillColors([...fillColors, { color: "E9816B", opacity: 100 }])
          }
        >
          <IconPlus24 />
        </IconButton>
      </div>

      {/* <div style={{ marginBottom: "8px" }}>
        {fillColors.map((color, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <input
              type="text"
              value={color}
              onChange={(e) =>
                handleColorInput((e.target as HTMLInputElement).value, index)
              }
              style={{
                width: "80px",
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: "2px",
                marginRight: "8px",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: `#${color}`,
                border: "1px solid #ccc",
                borderRadius: "2px",
                marginRight: "8px",
              }}
            />
            {fillColors.length > 1 && (
              <IconButton onClick={() => handleRemoveColor(index)}>
                <IconTrash24 />
              </IconButton>
            )}
          </div>
        ))}
      </div> */}

      {/* <Button fullWidth onClick={handleAddColor}>
        <IconPlus24 />
        <text>色を追加</text>
      </Button> */}

      <VerticalSpace space="medium" />
      <VerticalSpace space="medium" />
      <Button fullWidth onClick={handleCreateButtonClick}>
        生成
      </Button>
      <VerticalSpace space="medium" />
    </div>
  );
}
