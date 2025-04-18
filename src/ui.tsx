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

  const handleCreateButtonClick = useCallback(
    function () {
      if (count !== null && radius !== null && strokeWidth !== null) {
        emit<CreateCircleHandler>("CREATE_CIRCLE", {
          count,
          radius,
          strokeWidth,
          strokeCap,
          strokeJoin,
          dashPattern: [30, 30],
        });
      }
    },
    [count, radius, strokeWidth, strokeCap, strokeJoin]
  );

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>放射線の数</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        onNumericValueInput={setCount}
        onValueInput={setCountString}
        value={countString}
      />
      <VerticalSpace space="medium" />
      <Text>
        <Muted>長さ</Muted>
      </Text>
      <VerticalSpace space="small" />
      <VerticalSpace space="extraLarge" />
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
