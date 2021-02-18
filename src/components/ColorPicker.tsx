import * as React from 'react';

type props = {
  width: number,
  height: number,
  onSelect: (x: number, y: number) => any
}

export default class ColorPicker extends React.Component<props> {
  canvas: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;

  readonly state = { hue: 0, sat: 100, light: 0 };

  constructor(props: props) {
    super(props);

  }

  componentDidMount() {
    this.canvas = document.getElementById("picker") as HTMLCanvasElement;
    this.ctx = (document.getElementById("picker") as HTMLCanvasElement)?.getContext("2d");

    this.canvas.addEventListener("mousedown", (e) => {
      this.select(e.offsetX / this.props.width * 360, this.state.sat, (this.props.height - e.offsetY)/this.props.height*100);
    })

    this.drawPalette();
  }

  drawPalette() {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 360; j++) {
        if (this.ctx) {
          this.ctx.fillStyle = `hsl(${j},${this.state.sat}%, ${100-i}%)`;
          this.ctx.fillRect(this.props.width / 360 * j, this.props.height / 100 * i, this.props.width / 10, this.props.height / 10);
        }
      }
    }
  }

  select(hue: number, sat: number, light: number) {
    this.setState({ hue, sat, light });
    this.props.onSelect(hue, sat);
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <canvas id="picker" width={this.props.width} height={this.props.height}></canvas>
        <canvas id="slider" width={50} height={this.props.height}></canvas>
        <div id="cursor" style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, width: 12, height: 12, borderRadius: 99, borderWidth: 2, borderColor: "black", borderStyle: "solid" }}></div>
        <h1>hue: {this.state.hue} sat: {this.state.sat} light: {this.state.light}</h1>
      </div>
    )
  }
}
