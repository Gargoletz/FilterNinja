import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ColorPicker from './components/inputs/ColorInput';
import Rule from './logic/Rule';
import Value from './logic/Value';
import Item from './components/Item';

const SIZE = 18;
class App extends React.Component {

    container: HTMLDivElement;

    static items = [];
    readonly state = { offset: 0, from: 0, selected: [] as Rule[], clipboard: [] as Rule[], items: [] };

    constructor(props) {
        super(props);

        this.reload = this.reload.bind(this);
        this.newRule = this.newRule.bind(this);
        this.createRule = this.createRule.bind(this);
        this.insertRule = this.insertRule.bind(this);
        this.deleteRule = this.deleteRule.bind(this);
        this.selectRule = this.selectRule.bind(this);
        this.moveRule = this.moveRule.bind(this);
    }

    componentDidMount() {
        for (let i = 0; i < 40; i++)
            setTimeout(() => { this.createRule(); }, i * 5);

        document.addEventListener("mouseup", (e) => {
            if (!(e.target as HTMLElement).classList.contains("list-item-header")) {
                this.selectRule(undefined);
            }
        })

        document.addEventListener("wheel", (e) => {

            let firstElementHeight = document.querySelector(".item")?.clientHeight;
            let movement = 70 * (e.deltaY / Math.abs(e.deltaY));
            let newOffset = this.state.offset;

            if (this.container.clientHeight > window.innerHeight || this.state.items.length > SIZE) {
                if (movement > 0 && this.container.clientHeight - window.innerHeight > 0) {
                    newOffset = Math.max(this.state.offset - movement, window.innerHeight - this.container.clientHeight)
                    if (newOffset <= -firstElementHeight) {
                        newOffset += firstElementHeight
                        this.setState({ from: Math.min(this.state.from + 1, this.state.items.length - 1) });
                    }
                }
                else if (movement < 0) {
                    newOffset = Math.min(this.state.offset - movement, 0)
                    if (newOffset >= 0 && this.state.from > 0) {
                        this.setState({ from: Math.max(this.state.from - 1, 0) }, () => {
                            firstElementHeight = document.querySelector(".item")?.clientHeight;
                            newOffset -= firstElementHeight;
                        });
                    }
                }
            }
            this.setState({ offset: newOffset });
            console.log(this.state.offset, -document.querySelector(".item")?.clientHeight);
        })

        document.addEventListener("keydown", (e) => {
            //delete
            // if (e.keyCode == 46) {
            //     this.state.selected.forEach((val, i) => {
            //         this.deleteRule(val);
            //     });
            // }

            //up-arrow | w
            if (e.keyCode == 38 /**|| e.keyCode == 87*/) {
                this.state.selected.forEach((val, i) => {
                    this.moveRule(val, -1);
                })
            }
            //down-arrow | s
            else if (e.keyCode == 40 /**|| e.keyCode == 83 */) {
                this.state.selected.forEach((val, i) => {
                    this.moveRule(val, 1);
                })
            }

            // //spacebar
            // if (e.keyCode == 32) {
            //     let rule = this.newRule();
            //     if (this.state.selected && this.state.selected.length == 1 && this.state.selected[0])
            //         this.insertRule(rule, this.state.items.indexOf(this.state.selected[0]) + 1);
            //     else
            //         this.createRule();
            // }

            //ctrl + c
            if (e.keyCode == 67 && e.ctrlKey) {
                if (this.state.selected)
                    this.setState({ clipboard: this.state.selected });
            }
            //ctrl + v
            else if (e.keyCode == 86 && e.ctrlKey) {
                if (this.state.clipboard) {
                    this.state.clipboard.forEach((val, i) => {
                        if (this.state.selected[0])
                            this.insertRule(val.clone(), this.state.items.indexOf(this.state.selected[0]) + i + 1);
                        else
                            this.insertRule(val.clone(), this.state.items.length);
                    })
                }
            }
            //ctrl + x
            else if (e.keyCode == 88 && e.ctrlKey) {
                if (this.state.selected) {
                    this.setState({ clipboard: this.state.selected });
                    this.state.selected.forEach((val, i) => {
                        this.deleteRule(val);
                    })
                }
            }
            //ctrl + d
            else if (e.keyCode == 68 && e.ctrlKey) {
                if (this.state.selected) {
                    this.state.selected.forEach((val, i) => {
                        this.insertRule(val?.clone(), this.state.items.indexOf(val) + 1);
                    })
                }
            }

            // console.log(e.keyCode);
        })
    }

    async setItems(items: Rule[], callback?: () => any) {
        await this.setState({ items }, callback);
        App.items = items;
    }

    reload() {
        this.setItems([...this.state.items]);
    }

    newRule() {
        return new Rule(this, `new rule ${Math.floor(Math.random() * 100)}`);
    }

    async createRule() {
        await this.setItems([...this.state.items, this.newRule()]);
    }

    insertRule(rule: Rule, index: number) {
        if (rule) {
            let array = [];
            for (let i = 0; i < this.state.items.length + 1; i++) {
                let item = this.state.items[i];
                if (i == index)
                    array.push(rule);

                if (item)
                    array.push(item);
            }
            this.setItems(array);
        }
    }

    alterRule(rule: Rule, params: Object) {
        this.state.items.forEach((e, i) => {
            if (e.id == rule.id) {
                Object.keys(params).forEach((f, j) => {
                    if (e[f] instanceof Value)
                        e[f].value = params[f];
                    else
                        e[f] = params[f];
                })
            }
        })
        this.setItems([...this.state.items], () => {
            this.setState({ offset: Math.max(this.state.offset, -10) });
        });
    }

    deleteRule(rule: Rule) {
        let array = [];
        for (let i = 0; i < this.state?.items.length; i++) {
            let item = this.state.items[i];
            if (item != rule)
                array.push(item);
        }
        this.setItems(array);
    }

    selectRule(rule: Rule, append?: boolean, multiple?: boolean) {
        let selected = [rule];
        if (multiple) {
            if (this.state?.selected[this.state.selected.length - 1]) {
                let start = this.state.items.indexOf(this.state.selected[this.state.selected.length - 1]);
                let end = this.state.items.indexOf(rule) + 1;
                if (start < end)
                    selected = this.state.items.slice(start, end);
                else
                    selected = this.state.items.slice(end - 1, start + 1);
            }
        }
        if (append) {
            if (!multiple && this.state.selected.includes(selected[selected.length - 1])) {
                let array = [];
                this.state.selected.forEach((val, i) => {
                    if (val != selected[selected.length - 1])
                        array.push(val);
                })
                this.setState({ selected: [...array, ...selected.splice(0, selected.length - 1)] });
            }
            else
                this.setState({ selected: [...this.state.selected, ...selected] })
        }
        else
            this.setState({ selected: [...selected] });
    }

    moveRule(rule: Rule, step: number) {
        if (rule) {
            let array = [...this.state.items];
            for (let i = 0; i < Math.abs(step); i++) {
                let index = array.indexOf(rule);
                if ((index == 0 && step < 0) || (index == array.length - 1 && step > 0))
                    break;

                if (step < 0) {
                    let _temp = array[index - 1];
                    array[index - 1] = rule;
                    array[index] = _temp;
                }
                else {
                    let _temp = array[index + 1];
                    array[index + 1] = rule;
                    array[index] = _temp;
                }
            }
            this.setItems(array);
        }
    }

    printFilter() {
        let output = "";
        this.state.items.forEach((val, i) => {
            output += val.print();
        })
        console.log(output);
        return output;
    }

    loadFilter(input: string) {
        let lines = input.split("\n");
        let output = [];
        let rule: Rule;
        lines.forEach((line) => {
            line = line.trim();
            if (line.length > 0) {
                if (line.split(" ").includes("Show") || line.split(" ").includes("Hide")) {
                    if (rule)
                        output.push(rule);
                    rule = this.newRule();
                    rule.show = line.split(" ").includes("Show");
                }
                else if (line.charAt(0) != '#') {
                    let words = line.split("#")[0].split(" ");
                    words = words.reduce((p, c, i) => {
                        return (c.trim().length > 0) ? [...p, c] : [...p];
                    }, []);
                    rule.loadValue(words[0], words.splice(1, words.length));
                }
            }
        })
        output.push(rule);
        console.log(output);
        this.setItems(output);
    }

    render() {
        return (
            <div>
                <div ref={(container) => { this.container = container; }} style={{ position: "absolute", width: "100%", left: 0, top: 0, marginTop: this.state.offset, padding: "20px 0px" }}>

                    {this.state.items.map((e, i) => {
                        return (i >= this.state.from && i <= this.state.from + SIZE) ? < Item key={i} item={e} select={(append, multiple) => { this.selectRule(e, append, multiple); }} alter={(params) => { this.alterRule(e, params) }} duplicate={() => { this.insertRule(e.clone(), this.state.items.indexOf(e) + 1); }} delete={() => { this.deleteRule(e); }} selected={this.state?.selected?.includes(e)}></Item> : ''
                    })
                    }
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="button" style={{}} onClick={(e) => { this.createRule(); e.stopPropagation(); }}>Add new rule</button>
                    </div>
                </div >
                <div style={{ position: "fixed" }}>
                    <button className="button" style={{ left: 10, position: "fixed", zIndex: 100 }} onClick={() => {
                        fetch("http://localhost:3001", {
                            method: "POST",
                            body: JSON.stringify({ action: 'load' })
                        }).then(res => res.json()).then(res => { this.loadFilter(res.data) });
                    }}>Load!</button>
                    <button className="button" style={{ left: 75, position: "fixed", zIndex: 100 }} onClick={() => {
                        fetch("http://localhost:3001", {
                            method: "POST",
                            body: JSON.stringify({ action: 'save', data: this.printFilter() })
                        }).then(res => res.json()).then(res => { console.log(res); });
                    }}>Save!</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
