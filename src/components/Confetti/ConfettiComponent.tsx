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
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";
import { CreateConfettiHandler } from "../../types";

export function ConfettiComponent() {
  const [count, setCount] = useState<string>("1");
  const [size, setSize] = useState<string>("20");
  const [fillColor, setFillColor] = useState<string>("FF99FF");
  const [fillOpacity, setFillOpacity] = useState<string>("50");

  const minimum = 0;
  const maximum = 100;

  function handleCountInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setCount(newValue);
  }

  function handleSizeInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setSize(newValue);
  }

  function handleFillColorInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    setFillColor(event.currentTarget.value);
  }

  function handleFillOpacityInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setFillOpacity(event.currentTarget.value);
  }

  const handleCreateButtonClick = useCallback(() => {
    emit<CreateConfettiHandler>("CREATE_CONFETTI", {
      count: Number(count),
      size: Number(size),
      fillColor,
      fillOpacity: Number(fillOpacity),
    });
  }, [count, size, fillColor, fillOpacity]);

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
          <Muted>Size</Muted>
        </Text>
        <VerticalSpace space="small" />
        <RangeSlider
          maximum={maximum}
          minimum={minimum}
          onInput={handleSizeInput}
          value={size}
        />
        <VerticalSpace space="small" />
        <TextboxNumeric
          maximum={maximum}
          minimum={minimum}
          onInput={handleSizeInput}
          value={size}
        />
      </div>

      <VerticalSpace space="large" />
      <Divider />
      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>Color</Muted>
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

      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCreateButtonClick}>
          生成
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </div>
  );
}
