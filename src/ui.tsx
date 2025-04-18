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

  function handleDashLengthInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setDashLength(newValue);
  }

  function handleDashGapInput(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setDashGap(newValue);
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
        });
      }
    },
    [count, radius, strokeWidth, strokeCap, strokeJoin, dashLength, dashGap]
  );

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);

  return (
    <Container space="medium">
      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>破線の長さ</Muted>
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
          <Muted>破線の間隔</Muted>
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
