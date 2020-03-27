import * as React from 'react';
import NumberInput from '../inputs/NumberInput';
import SelectInput from '../inputs/SelectInput';
import Value from '../../logic/Value';

class Section extends React.Component<{ title?: string, flex?: number, value: Value<any> }> {
    render() {
        return (
            <div className="list-item-section" style={{ flex: (this.props.flex != undefined) ? this.props.flex : '1' }}>
                <div className={(!!this.props.value && this.props.value?.active) ? "button" : "button button--disabled"} style={{ backgroundColor: this.props?.value?.getParent().getColor(this.props?.value) }} onClick={() => {
                    if (!!this.props.value) {
                        this.props.value.getParent()?.toggle(this.props?.value);
                    }
                }} >{this.props.title}</div>
                {(this.props?.value?.active) ? <div className="list-item-section-content">
                </div> : ""}
            </div>
        );
    }
}

export default Section;