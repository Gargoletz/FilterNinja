import * as React from "react";
import NumberInput from '../inputs/NumberInput';

import Value from '../../logic/Value';
import ColorPicker from "../inputs/ColorInput";
import Section from "./Section";

class ColorSection extends React.Component<{ flex?: number, title: string, value: Value<Array<number>>, alter: (params: Object) => any }> {
    render() {
        let color = [0, 0, 0, 255];
        if (!!this.props.value)
            color = this.props.value.value;

        return (
            <Section title={this.props.title} column={true} value={this.props.value} style={{ maxWidth: 200 }}>
                {/* <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                        <ColorPicker width={180} height={100} onSelect={(red, green, blue) => { this.props.value.alter([red, green, blue, this.props.value.value[3]]); }}></ColorPicker>
                    </div> */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <NumberInput style={{ backgroundColor: "#FF4B4B", color: "white" }} value={color[0]} min={0} max={255} onChange={(value) => { this.props.value.alter([value, this.props.value.value[1], this.props.value.value[2], this.props.value.value[3]]); }} />
                    <NumberInput style={{ backgroundColor: "#429642", color: "white" }} value={color[1]} min={0} max={255} onChange={(value) => { this.props.value.alter([this.props.value.value[0], value, this.props.value.value[2], this.props.value.value[3]]); }} />
                    <NumberInput style={{ backgroundColor: "rgba(79, 79, 250, 0.65)", color: "white" }} value={color[2]} min={0} max={255} onChange={(value) => { this.props.value.alter([this.props.value.value[0], this.props.value.value[1], value, this.props.value.value[3]]); }} />
                    <NumberInput style={{ backgroundColor: "white", color: "black" }} value={color[3]} min={0} max={255} onChange={(value) => { this.props.value.alter([this.props.value.value[0], this.props.value.value[1], this.props.value.value[2], value]); }} />
                </div>
            </Section>
        );
    }
}

export default ColorSection;