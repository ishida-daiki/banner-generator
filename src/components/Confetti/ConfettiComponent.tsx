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

export function ConfettiComponent() {
  const [count, setCount] = useState<string>("10");
  const [size, setSize] = useState<string>("24");
  const [fillColors, setFillColors] = useState<string[]>(["E9816B"]);
  const [fillOpacity, setFillOpacity] = useState<string>("100");
  const [fillColor, setFillColor] = useState<string>("E9816B");

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

  // const handleFillOpacityInput = useCallback(function (value: string) {
  //   setFillOpacity(value);
  // }, []);

  const handleAddColor = useCallback(
    function () {
      setFillColors([...fillColors, "E9816B"]);
    },
    [fillColors]
  );

  const handleRemoveColor = useCallback(
    function (index: number) {
      const newColors = fillColors.filter((_, i) => i !== index);
      if (newColors.length > 0) {
        setFillColors(newColors);
      }
    },
    [fillColors]
  );

  const handleColorInput = useCallback(
    function (value: string, index: number) {
      const newColors = [...fillColors];
      newColors[index] = value.replace("#", "");
      setFillColors(newColors);
    },
    [fillColors]
  );

  const handleCreateButtonClick = useCallback(
    function () {
      emit<CreateConfettiHandler>("CREATE_CONFETTI", {
        count: parseInt(count),
        size: parseInt(size),
        fillColors,
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

      <div>
        <Text>
          <Muted>Color 1</Muted>
        </Text>
        <VerticalSpace space="small" />
        <TextboxColor
          hexColor={fillColor}
          onHexColorInput={handleFillColorInput}
          onOpacityInput={handleFillOpacityInput}
          opacity={fillOpacity}
        />
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

      <Button fullWidth onClick={handleAddColor}>
        <IconPlus24 />
        <text>色を追加</text>
      </Button>

      <VerticalSpace space="medium" />
      <VerticalSpace space="medium" />
      <Button fullWidth onClick={handleCreateButtonClick}>
        生成
      </Button>
      <VerticalSpace space="medium" />
    </div>
  );
}
