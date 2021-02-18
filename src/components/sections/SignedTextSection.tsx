import * as React from 'react';
import NumberInput from '../inputs/NumberInput';
import SelectInput from '../inputs/SelectInput';
import Value from '../../logic/Value';
import Section from './Section';

class SignedTextSection extends React.Component<{ title?: string, flex?: number, value: Value<{ sign: string, value: string }> }> {
    render() {
        return (
            <Section title={this.props.title} value={this.props.value}>
                <SelectInput style={{ minWidth: '12px', flex: '1' }} items={[{ title: '<=' }, { title: '<' }, { title: '=' }, { title: '>' }, { title: '>=' }]} value={this.props.value.value.sign} onChange={(val) => { this.props.value.alter({ sign: val, value: this.props.value.value.value }); }} />
                <SelectInput style={{ minWidth: '12px', flex: '2' }} items={[{ title: 'Normal' }, { title: 'Magic' }, { title: 'Rare' }, { title: 'Unique' }]} value={this.props.value.value.value} onChange={(val) => { this.props.value.alter({ sign: this.props.value.value.sign, value: val }); }} />
            </Section>
        );
    }
}

export default SignedTextSection;