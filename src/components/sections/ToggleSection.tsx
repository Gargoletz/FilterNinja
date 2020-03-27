import * as React from 'react';
import ToggleInput from '../inputs/ToggleInput';
import Value from '../../logic/Value';

class ToggleSection extends React.Component<{ title?: string, flex?: number, value: Value<boolean> }> {
    render() {
        return (
            <div className="list-item-section" style={{ /**flex: (this.props.flex != undefined) ? this.props.flex : '1' */ }}>
                <div className={(!!this.props.value && this.props.value.active) ? "button" : "button button--disabled"} style={{ backgroundColor: this.props.value.getParent().getColor(this.props.value) }} onClick={() => {
                    this.props.value?.getParent()?.toggle(this.props.value);
                }} >{this.props?.title}</div>
                {(this.props.value.active) ? <div className="list-item-section-content">
                    <ToggleInput value={this.props.value.value} onChange={(val) => { this.props.value.alter(val); }} />
                </div> : ""}
            </div>
        );
    }
}

export default ToggleSection;