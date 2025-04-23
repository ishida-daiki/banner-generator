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
      <VerticalSpace space="medium" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>
          <Bold>Count</Bold>
        </Text>
      </div>
      <div>
        <VerticalSpace space="small" />
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
      </div>

      <VerticalSpace space="small" />
      <Divider />
      <VerticalSpace space="small" />

      <div>
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
              setFillColors([...fillColors, { color: "E9816B", opacity: 100 }])
            }
          >
            <IconPlus24 />
          </IconButton>
        </div>
        <VerticalSpace space="extraSmall" />
        {fillColors.map((color, index) => (
          <div key={index}>
            {/* <Text>
              <Muted>Color {index + 1}</Muted>
            </Text>
            <VerticalSpace space="extraSmall" /> */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
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

      <VerticalSpace space="medium" />
      <VerticalSpace space="medium" />
      <Button fullWidth onClick={handleCreateButtonClick}>
        生成
      </Button>
      <VerticalSpace space="medium" />
    </div>
  );
}
