import * as React from 'react';
import Value from '../../logic/Value';

class TextInput extends React.Component<{ title?: string, placeholder: string, confirmWithEnter: boolean, value?: string, style?: React.CSSProperties, onChange: (value: string) => any }> {
    render() {
        return (
            <div className="input-text">
                {this.props.title} <input placeholder={this.props.placeholder} type="text" value={this.props.value} style={{ ...this.props.style }} onChange={(e) => {
                    if (!this.props?.confirmWithEnter)
                        this.props.onChange(e.currentTarget.value.trim());
                }} onKeyDown={(e) => {
                    if (this.props?.confirmWithEnter && e.key === "Enter" && !!e.currentTarget.value.trim()) {
                        this.props.onChange(e.currentTarget.value.trim());
                        e.currentTarget.value = "";
                    }
                }} />
            </div>
        );
    }
}

export default TextInput;