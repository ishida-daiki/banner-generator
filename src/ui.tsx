import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
  Dropdown,
  DropdownOption,
  RangeSlider,
  TextboxColor,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

import {
  CloseHandler,
  CreateRadialHandler,
  CreateCircleHandler,
} from "./types";

function Plugin() {
  const [count, setCount] = useState<number | null>(10);
  const [countString, setCountString] = useState("10");
  const [radius, setRadius] = useState<number | null>(400);
  const [strokeWidth, setStrokeWidth] = useState<number | null>(400);
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
  }

  function handleDashGapInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setDashGap(newValue);
  }

  function handleFillColorInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    setFillColor(event.currentTarget.value);
  }

  function handleFillOpacityInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setFillOpacity(event.currentTarget.value);
  }

  function handleStrokeColorInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setStrokeColor(event.currentTarget.value);
  }

  function handleStrokeOpacityInput(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    setStrokeOpacity(event.currentTarget.value);
  }

  const handleCreateButtonClick = useCallback(
    function () {
      if (count !== null && radius !== null && strokeWidth !== null) {
        emit<CreateCircleHandler>("CREATE_CIRCLE", {
          count,
          radius,
          strokeWidth,
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
      count,
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
        <Button fullWidth onClick={handleCloseButtonClick} secondary>
          閉じる
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
