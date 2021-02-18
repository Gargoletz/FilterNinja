import * as React from 'react';
import NumberInput from '../inputs/NumberInput';
import SelectInput from '../inputs/SelectInput';
import Value from '../../logic/Value';
import ToggleInput from '../inputs/ToggleInput';
import Section from './Section';

class MapIconSection extends React.Component<{ title?: string, flex?: number, value: Value<{ size: number, color: string, shape: string }> }> {
    render() {
        return (
            <Section title={this.props.title} value={this.props.value}>
                <SelectInput style={{ flex: 1, marginRight: 5 }} itemStyling={{}} value={this.props.value.value.size} items={[
                    { title: '0' },
                    { title: '1' },
                    { title: '2' },
                ]} onChange={(val) => { this.props.value.alter({ size: parseInt(val), color: this.props.value.value.color, shape: this.props.value.value.shape }); }}></SelectInput>
                <SelectInput style={{ flex: 2, marginRight: 5 }} itemStyling={{}} value={this.props.value.value.color} items={[
                    { title: 'Red', style: { backgroundColor: "red" } },
                    { title: 'Green', style: { backgroundColor: "green" } },
                    { title: 'Blue', style: { backgroundColor: "blue" } },
                    { title: 'Brown', style: { backgroundColor: "brown" } },
                    { title: 'White', style: { backgroundColor: "#fff", color: "black" } },
                    { title: 'Yellow', style: { backgroundColor: "yellow", color: "black" } },
                    { title: 'Cyan', style: { backgroundColor: "cyan", color: "black" } },
                    { title: 'Grey', style: { backgroundColor: "#444" } },
                    { title: 'Orange', style: { backgroundColor: "orange" } },
                    { title: 'Pink', style: { backgroundColor: "pink" } },
                    { title: 'Purple', style: { backgroundColor: "purple" } },
                ]} onChange={(val) => { this.props.value.alter({ size: this.props.value.value.size, color: val, shape: this.props.value.value.shape }); }}></SelectInput>
                <SelectInput style={{ flex: 3, marginRight: 5 }} itemStyling={{}} value={this.props.value.value.shape} items={[
                    { title: 'Circle' },
                    { title: 'Diamond' },
                    { title: 'Hexagon' },
                    { title: 'Square' },
                    { title: 'Star' },
                    { title: 'Triangle' },
                    { title: 'Cross' },
                    { title: 'Moon' },
                    { title: 'Raindrop' },
                    { title: 'Kite' },
                    { title: 'Pentagon' },
                    { title: 'UpsideDownHouse' },
                ]} onChange={(val) => { this.props.value.alter({ size: this.props.value.value.size, color: this.props.value.value.color, shape: val }); }}></SelectInput>
            </Section>
        );
    }
}

export default MapIconSection;