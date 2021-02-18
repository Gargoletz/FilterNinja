import * as React from 'react';
import ToggleInput from '../inputs/ToggleInput';
import Value from '../../logic/Value';
import Section from './Section';

class ToggleSection extends React.Component<{ title?: string, flex?: number, value: Value<boolean> }> {
    render() {
        return (
            <Section title={this.props.title} value={this.props.value}>
                <ToggleInput value={this.props.value.value} onChange={(val) => { this.props.value.alter(val); }} />
            </Section>
        );
    }
}

export default ToggleSection;