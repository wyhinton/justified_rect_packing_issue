import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import Packer, { Block } from "./Packer";

import React from "react";

const Canvas = (): JSX.Element => {
  const makeBlocks = (
    count: number,
    minWidth: number,
    maxWidth: number,
    colWidth: number
  ): Block[] => {
    let blocks = [];
    const widths = [1, 2, 3, 4, 5];
    for (let index = 0; index < count; index++) {
      const block = {
        w: randomElement(widths) * colWidth,
        h: 74,
      };
      blocks.push(block);
    }
    return blocks;
  };
  const palette = [
    "#b58900",
    "#cb4b16",
    "#dc322f",
    "#d33682",
    "#6c71c4",
    "#268bd2",
    "#2aa198",
    "#859900",
  ];
  const greens = [
    "#A4DE02",
    "#76BA1B",
    "#4C9A2A",
    "#1E5631",
    "#68BB59",
    "#ACDF87",
  ];
  const canvasWidth = window.innerWidth * 0.8;
  const canvasHeight = 800;
  const gutter = 5;
  const colWidth = canvasWidth / 10;
  const blocks = makeBlocks(25, 100, 100, colWidth);

  const packer = new Packer(canvasWidth, canvasHeight, 10);

  packer.fit(blocks);

  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Layer>
        {blocks.map((block, i) => (
          <Rect
            cornerRadius={5}
            key={i}
            id={`rect_${i}`}
            // x={block.fit?.right?.x}
            x={block.fit?.x}
            y={block.fit?.y}
            width={block.w - gutter}
            // width={block.w}
            height={block.h - gutter}
            // height={block.h}
            fill={block.fit?.used ? randomElement(greens) : "red"}
          />
        ))}
      </Layer>
    </Stage>
  );
};
export default Canvas;

function randomRange(myMin: number, myMax: number) {
  return Math.floor(
    Math.random() * (Math.ceil(myMax) - Math.floor(myMin) + 1) + myMin
  );
}
// https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript
function maxValue<T>(arr: T[]) {
  let max = arr[0];

  for (let val of arr) {
    if (val > max) {
      max = val;
    }
  }
  return max;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
