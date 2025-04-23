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
  Divider,
  Dropdown,
  DropdownOption,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";

import {
  CloseHandler,
  CreateCircleHandler,
  PreviewCircleHandler,
} from "./types";
import { RadialComponent } from "./components/Radial/RadialComponent";
import { ConfettiComponent } from "./components/Confetti/ConfettiComponent";
import { BalloonComponent } from "./components/Balloon/BalloonComponent";
import { SparkleComponent } from "./components/Sparkle/SparkleComponent";

function Plugin() {
  const [value, setBackgroundValue] = useState<string>("放射線");
  const options: Array<DropdownOption> = [
    {
      value: "放射線",
    },
    "-",
    {
      value: "紙吹雪",
    },
    {
      value: "風船",
    },
    {
      value: "キラキラ",
    },
  ];

  function handleChangeBackground(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setBackgroundValue(newValue);
  }

  const handleCreateButtonClick = useCallback(function () {
    console.log("create");
  }, []);

  return (
    <Stack space="small">
      {/* <div
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
      </div> */}

      <div>
        <VerticalSpace space="medium" />

        <Container space="medium">
          <Dropdown
            onChange={handleChangeBackground}
            options={options}
            value={value}
          />
        </Container>

        {value === "放射線" && <RadialComponent />}

        {value === "紙吹雪" && <ConfettiComponent />}
        {value === "風船" && <BalloonComponent />}
        {value === "キラキラ" && <SparkleComponent />}
      </div>
    </Stack>
  );
}

export default render(Plugin);
