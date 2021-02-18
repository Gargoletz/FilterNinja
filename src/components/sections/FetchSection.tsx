import * as React from 'react';
import TextInput from '../inputs/TextInput';
import NumberInput from '../inputs/NumberInput';
import SelectInput from '../inputs/SelectInput';
import Value from '../../logic/Value';
import Section from './Section';

class FetchSection extends React.Component<{ flex?: number, title?: string, value: Value<Array<string>> }> {

    readonly state = {
        min: 1,
        max: 999999,
        active: false,
        value: { value: "Scarab" }
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Section title={this.props.title} column={true} value={this.props.value} style={{ minWidth: 500 }}>
                <div className="list-item-section-collection">
                    {this.props.value.value.map((e, i) => {
                        return <p key={i} className="list-item-section-collection-item" onClick={(e) => {
                            let _arr = [];
                            console.log(e.currentTarget.innerHTML)
                            for (let i = 0; i < this.props.value.value.length; i++) {
                                if (this.props.value.value[i] != e.currentTarget.innerHTML)
                                    _arr.push(this.props.value.value[i]);
                            }
                            this.props.value.alter(_arr);
                        }}>{e}</p>;
                    })}
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flex: 5 }}>
                        <TextInput placeholder={"Type here and press Enter"} confirmWithEnter={true} onChange={(value) => { this.props.value.alter([...this.props.value.value, value]) }} />
                    </div>
                    <div style={{ position: "relative", marginLeft: "5px", flex: 2 }}>
                        <div className="button" style={{ marginLeft: "0px" }} onClick={() => { this.setState({ active: !this.state.active }) }}>Fetch</div>
                        {(this.state.active) ? <div className="popup" style={{ top: "26px" }}>
                            <SelectInput items={[{ title: 'DivinationCard' }, { title: 'Scarab' }, { title: 'Resonator' }, { title: 'Fragment' }, { title: 'Fossil' }, { title: 'UniqueJewel' }]} value={this.state.value.value} onChange={(val) => { this.setState({ value: { value: val } }) }} />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <NumberInput title="Min" min={1} max={this.state.max} value={this.state.min} onChange={(value) => { this.setState({ min: value }) }} />
                                <NumberInput title="Max" min={this.state.min} max={99999} value={this.state.max} onChange={(value) => { this.setState({ max: value }) }} />
                            </div>
                            <div className="button" style={{ marginTop: "8px" }} onClick={() => { this.props.value.alter(this.props.value.getParent().app.fetch(this.state.value.value, this.state.min, this.state.max)); this.setState({ active: false }) }}>Fetch</div>
                        </div> : ""}
                    </div>
                </div>
            </Section>
        );
    }
}

export default FetchSection;