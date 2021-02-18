import * as React from 'react';
import NumberInput from '../inputs/NumberInput';
import SelectInput from '../inputs/SelectInput';
import Value from '../../logic/Value';
import Section from './Section';

class SignedSection extends React.Component<{ title?: string, flex?: number, min?: number, max?: number, value: Value<{ sign: string, value: number }> }> {
    render() {
        return (
            <Section title={this.props.title} value={this.props.value}>
                <SelectInput style={{ minWidth: '12px', flex: '1' }} items={[{ title: '<=' }, { title: '<' }, { title: '=' }, { title: '>' }, { title: '>=' }]} value={this.props.value.value.sign} onChange={(val) => { this.props.value.alter({ sign: val, value: this.props.value.value.value }); }} />
                <NumberInput style={{ height: '29px', flex: '2', marginRight: '-6px' }} value={this.props.value.value.value} min={(this.props.min) ? this.props.min : 0} max={(this.props.max) ? this.props.max : 255} onChange={(val) => { this.props.value.alter({ sign: this.props.value.value.sign, value: val }); }} />
            </Section>
        );
    }
}

export default SignedSection;