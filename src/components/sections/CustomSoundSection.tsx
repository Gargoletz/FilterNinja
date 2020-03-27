import * as React from 'react';
import Value from '../../logic/Value';
import TextInput from '../inputs/TextInput';

class CustomSoundSection extends React.Component<{ title?: string, flex?: number, value: Value<{ file: string }> }> {
    render() {
        return (
            <div className="list-item-section" style={{ flex: (this.props.flex != undefined) ? this.props.flex : '1' }}>
                <div className={(!!this.props.value && this.props.value?.active) ? "button" : "button button--disabled"} style={{ backgroundColor: this.props?.value?.getParent().getColor(this.props?.value) }} onClick={() => {
                    if (!!this.props.value) {
                        this.props.value.getParent()?.toggle(this.props?.value);
                    }
                }} >{this.props.title}</div>
                {(this.props?.value?.active) ? <div className="list-item-section-content">
                    <TextInput value={this.props.value.value.file} confirmWithEnter={false} placeholder={"Write Here"} onChange={(val) => { console.log("????"); this.props.value.alter({ file: val }); }}></TextInput>
                </div> : ""}
            </div>
        );
    }
}

export default CustomSoundSection;