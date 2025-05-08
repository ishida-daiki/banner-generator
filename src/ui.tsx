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
  const [tabBackgroundValue, setTabBackgroundValue] =
    useState<string>("放射線");
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

  const style = {
    backgroundColor: "var(--figma-color-bg-secondary)",
    height: "30%",
  };

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
        <Container
          space="extraSmall"
          style={{
            ...style,
            position: "relative",
            overflow: "hidden",
            height: "180px",
          }}
        >
          {/* 背景プレビュー */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            {value === "Background" && tabBackgroundValue === "放射線" && (
              <RadialPreview />
            )}
            {value === "Background" &&
              tabBackgroundValue === "グラデーション" && <GradientPreview />}
          </div>
          {/* 前景プレビュー */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              padding: "20px",
            }}
          >
            {value === "Front" && tabFrontValue === "紙吹雪" && (
              <ConfettiPreview />
            )}
            {value === "Front" && tabFrontValue === "風船" && (
              <BalloonPreview />
            )}
            {value === "Front" && tabFrontValue === "キラキラ" && (
              <SparklePreview />
            )}
          </div>
        </Container>

        <VerticalSpace space="small" />

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

// プレビュー用のダミーコンポーネント（後で本実装に差し替え）
function RadialPreview() {
  return (
    <svg width="100%" height="100%">
      <circle cx="50%" cy="50%" r="40%" fill="#eee" />
    </svg>
  );
}
function GradientPreview() {
  return (
    <svg width="100%" height="100%">
      <rect width="100%" height="100%" fill="url(#grad)" />
      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ccc" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function ConfettiPreview({ color = "#E9816B" }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 33">
      <path
        d="M 0.875331 32.5435 L 15.0463 32.5435 C 15.447 32.5435 15.7715 32.2097 15.782 31.7981 C 16.0783 20.1143 20.3291 13.1125 23.5769 1.26206 C 23.7081 0.783286 23.3549 0.306895 22.8702 0.306895 L 7.78384 0.306895 C 7.45584 0.306895 7.16801 0.534077 7.07849 0.857865 C 3.78611 12.7661 0.0873691 19.7795 0.142649 31.7953 C 0.144549 32.208 0.473724 32.5435 0.875331 32.5435 Z"
        fill={`#${color}`}
      />
    </svg>
  );
}
function BalloonPreview({ color = "#E9816B" }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 140">
      <path
        d="M 76.0017 24.4365 C 66.1816 2.56103 44.5378 -5.7088 25.0143 4.94195 C 9.66854 13.3164 -0.903148 34.1269 0.368703 53.4512 C 1.90873 76.856 15.6065 95.326 37.198 96.5677 C 36.5154 97.8018 35.6013 99.3053 34.5567 100.547 C 33.5857 101.712 35.189 102.778 37.3709 103.409 C 37.0517 110.31 36.0977 127.025 33.8637 138.889 L 35.912 139.214 C 38.1297 127.446 39.1 111.031 39.4381 103.847 C 40.2528 103.963 41.0658 104.02 41.7983 103.989 C 42.8188 103.954 43.4364 103.022 42.9464 102.269 C 41.9605 100.748 40.5827 98.4497 39.9836 96.6536 C 40.9472 96.6744 41.9988 96.7005 42.4533 96.7279 C 48.8656 97.0473 54.7645 94.8897 60.1345 90.6568 C 79.0941 75.699 86.0037 46.7331 75.9944 24.4361 L 76.0017 24.4365 Z"
        fill={`#${color}`}
      />
    </svg>
  );
}
function SparklePreview({ color = "#E9816B" }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 88 96">
      <path
        d="M 40.6045 8.89746 C 33.5713 27.3301 18.6846 41.666 0 48 C 18.6846 54.334 33.5713 68.6699 40.6045 87.1025 L 44 96 L 47.3955 87.1025 C 54.4287 68.6699 69.3154 54.334 88 48 C 69.3154 41.666 54.4287 27.3301 47.3955 8.89746 L 44 0 L 40.6045 8.89746 Z"
        fill={`#${color}`}
      />
    </svg>
  );
}

export default render(Plugin);
