import * as React from 'react';
import TextInput from '../inputs/TextInput';
import Value from '../../logic/Value';
import Section from './Section';

class CollectionSection extends React.Component<{ title: string, flex?: number, value: Value<Array<string>> }> {
    render() {
        return (
            <Section title={this.props.title} column={true} value={this.props.value}>
                <div className="list-item-section-collection" style={{ display: (this.props.value.value.length > 0) ? 'block' : 'none' }}>
                    {this.props.value.value.map((e, i) => {
                        return <p key={i} className="list-item-section-collection-item" onClick={(e) => {
                            let _arr = [];
                            for (let i = 0; i < this.props.value.value.length; i++) {
                                if (this.props.value.value[i] != e.currentTarget.innerHTML)
                                    _arr.push(this.props.value.value[i]);
                            }
                            this.props.value.alter(_arr);
                        }}>{e}</p>;
                    })}
                </div>
                <TextInput placeholder={"Type here"} confirmWithEnter={true} onChange={(value) => { this.props.value.alter([...this.props.value.value, value]) }} />
            </Section>
        );
    }
}

export default CollectionSection;