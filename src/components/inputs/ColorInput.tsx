import * as React from 'react';

type props = {
  width: number,
  height: number,
  onSelect: (red: number, green: number, blue: number) => any
}

export default class ColorInput extends React.Component<props> {
  canvas: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;

  canSelect = true;
  readonly state = { id: Math.random() + '', pressed: false, hue: 0, sat: 100, light: 0 };

  constructor(props: props) {
    super(props);

  }

  hslToRgb(h: number, s: number, l: number) {
    var r: number, g: number, b: number;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { red: Math.round(r * 255), green: Math.round(g * 255), blue: Math.round(b * 255) };
  }

  componentDidMount() {
    // if (this.refs.img) {
    //   let img = (this.refs.img as HTMLElement)
    //   img.addEventListener("mousedown", (e) => {
    //     this.setState({ pressed: true });
    //     let hue = Math.round(Math.max(e.offsetX, 0) / this.props.width * 360);
    //     let light = Math.round((this.props.height - e.offsetY) / this.props.height * 100);
    //     this.select(hue, this.state.sat, light);
    //   })
    //   img.addEventListener("mouseup", (e) => {
    //     this.setState({ pressed: false });
    //   })
    //   img.addEventListener("mouseout", (e) => {
    //     this.setState({ pressed: false });
    //   })
    //   img.addEventListener("mousemove", (e) => {
    //     if (this.state.pressed) {
    // let hue = Math.round(Math.max(e.offsetX, 0) / this.props.width * 360);
    // let light = Math.round((this.props.height - e.offsetY) / this.props.height * 100);
    // this.select(hue, this.state.sat, light);
    //     }
    //   })
    // }
  }

  select(hue: number, sat: number, light: number) {
    if (this.canSelect) {
      this.canSelect = false;
      this.setState({ hue, sat, light }, () => {
        this.canSelect = true;
      });
      let color = this.hslToRgb(hue / 360, sat / 100, light / 100);
      this.props.onSelect(color.red, color.green, color.blue);
    }
  }

  render() {
    return (
      <div style={{ width: this.props.width, height: this.props.height, border: "3px solid #444", position: "relative" }}>
        {/* <canvas id={this.state.id} width={this.props.width} height={this.props.height}></canvas> */}
        <img ref="img"
          onMouseDown={(e) => { this.setState({ pressed: true }) }}
          onMouseUp={(e) => { this.setState({ pressed: false }) }}
          onMouseOver={(e) => { this.setState({ pressed: false }) }}
          onMouseMove={(e) => {
            if (this.state.pressed) {
              let hue = Math.round(Math.max(e.nativeEvent.offsetX, 0) / this.props.width * 360);
              let light = Math.round((this.props.height - e.nativeEvent.offsetY) / this.props.height * 100);
              this.select(hue, this.state.sat, light);
            }
          }} draggable={false} style={{ justifySelf: "center", }} src="./gfx/palette.png" width={this.props.width} height={this.props.height}></img>
        {/* <canvas id="slider" width={50} height={this.props.height}></canvas> */}
        <div id="cursor"
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: this.props.height - this.state.light - 1,
            left: this.props.width / 360 * this.state.hue - 2.5,
            width: 6, height: 6,
            borderRadius: 99,
            borderWidth: 2,
            borderColor: (this.state.light < 70) ? "#fff" : "#000", borderStyle: "solid"
          }}></div>
      </div>
    )
  }
}
