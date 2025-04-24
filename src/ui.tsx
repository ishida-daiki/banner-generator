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
  Tabs,
  TabsOption,
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
  const [value, setBackgroundValue] = useState<string>("Background");
  const options: Array<DropdownOption> = [
    {
      value: "Background",
    },
    "-",
    {
      value: "Front",
    },
  ];

  function handleChangeBackground(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setBackgroundValue(newValue);
  }

  // 前景
  const [tabFrontValue, setTabFrontValue] = useState<string>("紙吹雪");
  const tabFrontOptions: Array<TabsOption> = [
    {
      children: <ConfettiComponent />,
      value: "紙吹雪",
    },
    {
      children: <BalloonComponent />,
      value: "風船",
    },
    {
      children: <SparkleComponent />,
      value: "キラキラ",
    },
  ];
  function handleChangeFronTab(event: h.JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setTabFrontValue(newValue);
  }

  // 背景
  const [tabBackgroundValue, setTabBackgroundValue] = useState<string>("放射線");
  const tabBackgroundOptions: Array<TabsOption> = [
    {
      children: <RadialComponent />,
      value: "放射線",
    },
    {
      children: <RadialComponent />,
      value: "グラデーション",
    },
  ];

  function handleChangeBackgroundTab(
    event: h.JSX.TargetedEvent<HTMLInputElement>
  ) {
    const newValue = event.currentTarget.value;
    setTabBackgroundValue(newValue);
  }
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

        <Container space="extraSmall">
          <Dropdown
            onChange={handleChangeBackground}
            options={options}
            value={value}
          />
        </Container>

        {value === "Background" && (
          <Tabs
            onChange={handleChangeBackgroundTab}
            options={tabBackgroundOptions}
            value={tabBackgroundValue}
          />
        )}
        {value === "Front" && (
          <Tabs
            onChange={handleChangeFronTab}
            options={tabFrontOptions}
            value={tabFrontValue}
          />
        )}
      </div>
    </Stack>
  );
}

export default render(Plugin);
