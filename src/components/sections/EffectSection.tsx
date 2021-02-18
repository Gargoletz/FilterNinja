import * as React from 'react';
import NumberInput from '../inputs/NumberInput';
import SelectInput from '../inputs/SelectInput';
import Value from '../../logic/Value';
import ToggleInput from '../inputs/ToggleInput';
import Section from './Section';

class EffectSection extends React.Component<{ title?: string, flex?: number, value: Value<{ color: string, temp?: boolean }> }> {
    render() {
        return (
            <Section title={this.props.title} value={this.props.value}>
                <SelectInput style={{ flex: 2, marginRight: 5 }} itemStyling={{}} value={this.props.value.value.color} items={[
                    { title: 'Red', style: { color: "red" } },
                    { title: 'Green', style: { color: "green", fontWeight: "bold" } },
                    { title: 'Blue', style: { color: "blue" } },
                    { title: 'Brown', style: { color: "brown" } },
                    { title: 'White', style: { color: "#fff" } },
                    { title: 'Yellow', style: { color: "yellow" } },
                    { title: 'Cyan', style: { color: "cyan" } },
                    { title: 'Grey', style: { color: "#444" } },
                    { title: 'Orange', style: { color: "orange" } },
                    { title: 'Pink', style: { color: "pink" } },
                    { title: 'Purple', style: { color: "purple" } },
                ]} onChange={(val) => { this.props.value.alter({ color: val }); }}></SelectInput>
                <ToggleInput value={(this.props.value.value.temp) ? this.props.value.value.temp : false} onChange={(val) => { this.props.value.alter({ color: this.props.value.value.color, temp: !this.props.value.value.temp }) }}></ToggleInput>
            </Section>
        );
    }
}

export default EffectSection;