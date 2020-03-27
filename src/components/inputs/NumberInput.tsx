import * as React from "react";

class NumberInput extends React.Component<{ flex?: number, style?: React.CSSProperties, title?: string, value: number, min: number, max: number, onChange: (value: number) => any }> {
    render() {
        return (
            <div className="input-number" style={{ flex: (!!this.props.flex) ? this.props.flex : "" }}>
                {this.props.title} <input type="text" value={this.props.value} style={{ ...this.props.style }} onChange={(e) => {
                    if (!!this.props.onChange)
                        this.props.onChange((!!e.currentTarget.value) ? Math.min(parseInt(e.currentTarget.value), this.props.max) : 0);
                }} onBlur={(e) => { if (!!this.props.onChange) { this.props.onChange(Math.max(parseInt(e.currentTarget.value), this.props.min)) } }} />
            </div>
        );
    }
}

export default NumberInput;