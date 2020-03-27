import * as React from 'react';
import NumberInput from '../inputs/NumberInput';
import SelectInput from '../inputs/SelectInput';
import Value from '../../logic/Value';
import ToggleInput from '../inputs/ToggleInput';

class AlertSoundSection extends React.Component<{ title?: string, flex?: number, value: Value<{ id: number, volume: number }> }> {
    render() {
        return (
            <div className="list-item-section" style={{ flex: (this.props.flex != undefined) ? this.props.flex : '1' }}>
                <div className={(!!this.props.value && this.props.value?.active) ? "button" : "button button--disabled"} style={{ backgroundColor: this.props?.value?.getParent().getColor(this.props?.value) }} onClick={() => {
                    if (!!this.props.value) {
                        this.props.value.getParent()?.toggle(this.props?.value);
                    }
                }} >{this.props.title}</div>
                {(this.props?.value?.active) ? <div className="list-item-section-content">
                    <SelectInput style={{ flex: 1, marginRight: 5 }} itemStyling={{}} value={this.props.value.value.id} items={[
                        { title: '1' },
                        { title: '2' },
                        { title: '3' },
                        { title: '4' },
                        { title: '5' },
                        { title: '6' },
                        { title: '7' },
                        { title: '8' },
                        { title: '9' },
                        { title: '10' },
                        { title: '11' },
                        { title: '12' },
                        { title: '13' },
                        { title: '14' },
                        { title: '15' },
                        { title: '16' },
                    ]} onChange={(val) => { this.props.value.alter({ id: parseInt(val), volume: this.props.value.value.volume }); }}></SelectInput>
                    <NumberInput style={{ height: '29px', marginRight: '-6px' }} value={this.props.value.value.volume} min={0} max={300} onChange={(val) => { this.props.value.alter({ id: this.props.value.value.id, volume: val }); }} />
                </div> : ""}
            </div>
        );
    }
}

export default AlertSoundSection;