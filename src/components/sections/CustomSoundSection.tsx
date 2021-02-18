import * as React from 'react';
import Value from '../../logic/Value';
import TextInput from '../inputs/TextInput';
import Section from './Section';

class CustomSoundSection extends React.Component<{ title?: string, flex?: number, value: Value<{ file: string }> }> {
    render() {
        return (
            <Section title={this.props.title} value={this.props.value}>
                <TextInput
                    value={this.props.value.value.file}
                    confirmWithEnter={false}
                    placeholder={"Write Here"}
                    onChange={(val) => {
                        console.log("????");
                        this.props.value.alter({ file: val });
                    }}>
                </TextInput>
            </Section>
        );
    }
}

export default CustomSoundSection;