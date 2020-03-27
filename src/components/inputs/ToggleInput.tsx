import * as React from 'react';

class ToggleInput extends React.Component<{ value: boolean, onChange: (value: boolean) => any }> {
    render() {
        return (
            <div className="input-toggle">
                <div className="" style={{ backgroundColor: (this.props.value) ? "#a5f7a5" : "#ff9393", color: (this.props.value) ? "#385438" : "" }} onClick={() => { this.props.onChange(!this.props.value) }}>{this.props.value.toString()}</div>
            </div>
        );
    }
}

export default ToggleInput;