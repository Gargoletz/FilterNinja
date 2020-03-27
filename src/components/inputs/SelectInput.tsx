import * as React from 'react';

class SelectInput extends React.Component<{ value: string, items: { title: string, style?: React.CSSProperties }[], style?: React.CSSProperties, itemStyling?: React.CSSProperties, onChange: (value: string) => any }> {

    readonly state = { active: false };

    constructor(props) {
        super(props);

        this.state = { active: false }
    }

    render() {
        return (
            <div className="input-color" style={{ position: "relative", ...this.props.style }}>
                <div className="button lower" onClick={() => { this.setState({ active: !this.state.active }) }}>{this.props.value}</div>
                {(this.state.active) ? <div className="popup" style={{ top: "26px" }}>
                    {this.props.items.map((e, i) => {
                        if (e.title != this.props.value)
                            return <div key={i}
                                style={{ fontWeight: "bold", ...e?.style }}
                                className="input-select-item"
                                onClick={() => {
                                    if (!!this.props.onChange)
                                        this.props.onChange(e.title);
                                    this.setState({ active: false });
                                }}>
                                {e.title}
                            </div>
                    })}
                </div> : ""}
            </div>
        );
    }
}

export default SelectInput;