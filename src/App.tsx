import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/style.css";

import Rule from "./logic/Rule";
import Value from "./logic/Value";
import Item from "./components/Item";
import RenderedList from "./components/RenderedList";
import AppContext from "./logic/AppContext";
import Toolbar from "./components/Toolbar";

import { loadFilter, printFilter } from "./logic/Filter";

const SIZE = 18;
class App extends React.Component {
  list: React.RefObject<RenderedList>;

  static items = [];
  readonly state = {
    offset: 0,
    from: 0,
    selected: [] as Rule[],
    clipboard: [] as Rule[],
    items: [],
    editedRule: undefined as Rule,
  };

  constructor(props) {
    super(props);

    this.list = React.createRef();
  }

  componentDidMount() {
    for (let i = 0; i < 5; i++)
      setTimeout(() => {
        this.addRuleToEnd();
      }, i * 5);

    document.addEventListener("mouseup", (e) => {
      // if (!(e.target as HTMLElement).classList.contains("list-item-header")) {
      //     this.selectRule(undefined);
      // }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key == "Control") {
        this.setState({ isInEditMode: false });
      }
    });

    document.addEventListener("keydown", (e) => {
      //delete
      // if (e.keyCode == 46) {
      //     this.state.selected.forEach((val, i) => {
      //         this.deleteRule(val);
      //     });
      // }

      if (e.key == "Control") {
        this.setState({ isInEditMode: true });
      }

      //up-arrow | w
      if (e.keyCode == 38 /**|| e.keyCode == 87*/) {
        let index = this.state.items.indexOf(this.state.selected[0]);
        if (index > 0) {
          let query = document.querySelector(`#list-element-${index - 1}`);
          this.list.current.move(query.getBoundingClientRect().height);
        }

        this.state.selected.forEach((val) => {
          this.moveRule(val, -1);
        });
      }
      //down-arrow | s
      else if (e.keyCode == 40 /**|| e.keyCode == 83 */) {
        let index = this.state.items.indexOf(
          this.state.selected[this.state.selected.length - 1]
        );
        if (index < this.state.items.length - 1) {
          let query = document.querySelector(`#list-element-${index + 1}`);
          this.list.current.move(-query.getBoundingClientRect().height);
        }

        this.state.selected.forEach((val, i) => {
          this.moveRule(val, 1);
        });
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
            if (this.state.selected.length > 0)
              this.insertRuleAtIndex(
                val.clone(),
                this.state.items.indexOf(
                  this.state.selected[this.state.selected.length - 1]
                ) +
                  i +
                  1
              );
            else this.insertRuleAtIndex(val.clone(), this.state.items.length);
          });
        }
      }
      //ctrl + x
      else if (e.keyCode == 88 && e.ctrlKey) {
        if (this.state.selected) {
          this.setState({ clipboard: this.state.selected });
          this.state.selected.forEach((val, i) => {
            this.deleteRule(val);
          });
        }
      }
      //ctrl + d
      else if (e.keyCode == 68 && e.ctrlKey) {
        if (this.state.selected) {
          this.state.selected.forEach((val, i) => {
            this.insertRuleAtIndex(
              val?.clone(),
              this.state.items.indexOf(val) + 1
            );
          });
        }
      }

      // console.log(e.keyCode);
    });
  }

  async setItems(items: Rule[], callback?: () => any) {
    this.setState({ items }, callback);
    App.items = items;
  }

  reload() {
    this.setItems([...this.state.items]);
  }

  getNewRule = (): Rule => {
    return new Rule(this, `Rule #${Math.floor(Math.random() * 100)}`);
  };

  addRuleToBegin = async () => {
    await this.setItems([this.getNewRule(), ...this.state.items]);
    this.list.current.bar.current.move(0);
  };

  addRuleAfterSelected = () => {
    if (this.state.selected.length > 0) {
      this.insertRuleAtIndex(
        this.getNewRule(),
        this.state.items.indexOf(
          this.state.selected[this.state.selected.length - 1]
        ) + 1
      );
    }
  };

  addRuleToEnd = async () => {
    await this.setItems([...this.state.items, this.getNewRule()]);
    this.list.current.bar.current.move(
      document.body.getBoundingClientRect().height
    );
  };

  insertRuleAtIndex = (rule: Rule, index: number) => {
    if (rule) {
      let array = [];
      for (let i = 0; i < this.state.items.length + 1; i++) {
        let item = this.state.items[i];
        if (i == index) array.push(rule);

        if (item) array.push(item);
      }
      this.setItems(array);
    }
  };

  insertRuleAfterIndex = (rule: Rule, index: number) => {
    this.insertRuleAtIndex(rule, index + 1);
  };

  alterRule = (rule: Rule, params: Object) => {
    console.log("halo", rule);
    this.state.items.forEach((e, i) => {
      if (e.id == rule.id) {
        Object.keys(params).forEach((f, j) => {
          if (e[f] instanceof Value) e[f].value = params[f];
          else e[f] = params[f];
        });
      }
    });
    this.setItems([...this.state.items], () => {
      this.setState({ offset: Math.max(this.state.offset, -10) });
    });
  };

  deleteRule = async (rule: Rule, callback?: () => any) => {
    await this.setItems(
      this.state.items.filter((r) => r != rule),
      callback
    );
  };

  deleteMultipleRules = (rules: Rule[], callback?: () => any) => {
    this.setItems(
      this.state.items.filter((r) => !rules.includes(r)),
      callback
    );
  };

  deleteSelectedRules = () => {
    this.deleteMultipleRules(this.state.selected);
  };

  selectRule = (rule: Rule, append?: boolean, multiple?: boolean) => {
    let selected = [rule];
    if (multiple) {
      if (this.state?.selected[this.state.selected.length - 1]) {
        let start = this.state.items.indexOf(
          this.state.selected[this.state.selected.length - 1]
        );
        let end = this.state.items.indexOf(rule) + 1;
        if (start < end) selected = this.state.items.slice(start, end);
        else selected = this.state.items.slice(end - 1, start + 1);
      }
    }
    if (append) {
      if (
        !multiple &&
        this.state.selected.includes(selected[selected.length - 1])
      ) {
        let array = [];
        this.state.selected.forEach((val, i) => {
          if (val != selected[selected.length - 1]) array.push(val);
        });
        this.setState({
          selected: [...array, ...selected.splice(0, selected.length - 1)],
        });
      } else this.setState({ selected: [...this.state.selected, ...selected] });
    } else this.setState({ selected: [...selected] });
  };

  moveRuleToTop = (rule: Rule) => {
    this.deleteRule(rule, () => {
      this.insertRuleAtIndex(rule, 0);
      this.list.current.bar.current.move(0);
    });
  };

  moveMultipleToTop = (rules: Rule[]) => {
    this.deleteMultipleRules(rules, () => {
      this.setItems([...rules, ...this.state.items], () => {
        this.list.current.bar.current.move(0);
      });
    });
  };

  moveSelectedToTop = () => {
    if (this.state.selected.length > 1) {
      this.moveMultipleToTop(this.state.selected);
    } else this.moveRuleToTop(this.state.selected[0]);
  };

  moveRuleToBottom = (rule: Rule) => {
    this.deleteRule(rule, () => {
      this.insertRuleAtIndex(rule, this.state.items.length);
      this.list.current.bar.current.move(
        document.body.getBoundingClientRect().height
      );
    });
  };

  moveMultipleToBottom = (rules: Rule[]) => {
    this.deleteMultipleRules(rules, () => {
      this.setItems([...this.state.items, ...rules], () => {
        this.list.current.bar.current.move(
          document.body.getBoundingClientRect().height
        );
      });
    });
  };

  moveSelectedToBottom = () => {
    if (this.state.selected.length > 1) {
      this.moveMultipleToBottom(this.state.selected);
    } else this.moveRuleToBottom(this.state.selected[0]);
  };

  moveRule = (rule: Rule, step: number) => {
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
        } else {
          let _temp = array[index + 1];
          array[index + 1] = rule;
          array[index] = _temp;
        }
      }
      this.setItems(array);
    }
  };

  render() {
    const provider = {
      editedRule: this.state.editedRule,
      selected: this.state.selected,
      createNew: () => {
        this.setState({
          offset: 0,
          from: 0,
          selected: [] as Rule[],
          clipboard: [] as Rule[],
          items: [],
          isInEditMode: false,
        });
        this.list.current.move(0);
      },
      addBegin: () => this.addRuleToBegin(),
      addAfter: () => this.addRuleAfterSelected(),
      addEnd: () => this.addRuleToEnd(),
      select: (rule: Rule, append: boolean, multiple: boolean) => {
        this.selectRule(rule, append, multiple);
      },
      openEdit: (rule: Rule) => {
        this.setState({ editedRule: rule });
      },
      alter: (rule: Rule, params: Object) => {
        this.alterRule(rule, params);
      },
      duplicate: (r: Rule) => {
        this.insertRuleAfterIndex(r.clone(), this.state.items.indexOf(r));
      },
      delete: (r: Rule) => {
        this.deleteRule(r);
      },
      deleteSelected: () => this.deleteSelectedRules(),
      moveRuleToTop: (rule: Rule) => this.moveRuleToTop(rule),
      moveSelectedToTop: () => this.moveSelectedToTop(),
      moveRuleToBottom: (rule: Rule) => this.moveRuleToBottom(rule),
      moveSelectedToBottom: () => this.moveSelectedToBottom(),
      load: (data: string) => {
        this.setItems(loadFilter(this.getNewRule, data));
        this.list.current.bar.current.move(0);
      },
      print: () => printFilter(this.state.items),
    };

    return (
      <AppContext.Provider value={provider}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            left: 0,
            top: 0,
          }}
        >
          <RenderedList ref={this.list}>
            {this.state.items.map((e, i) => {
              return <Item key={i} item={e} />;
            })}
          </RenderedList>
        </div>
        <Toolbar />
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
