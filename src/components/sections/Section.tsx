import * as React from "react";
import NumberInput from "../inputs/NumberInput";
import SelectInput from "../inputs/SelectInput";
import Value from "../../logic/Value";
import { textChangeRangeIsUnchanged } from "typescript";
import AppContext from "../../logic/AppContext";

class Section extends React.Component<{
  title?: string;
  flex?: number;
  column?: boolean;
  style?: Object;
  value: Value<any>;
}> {
  static contextType = AppContext;

  render() {
    const { editedRule, selected } = this.context;
    return this.props.value?.active ||
      (editedRule == this.props.value.getParent()) ? (
      <div
        className="list-item-section"
        style={{
          minWidth: 200,
          ...this.props
            .style /*flex: (this.props.flex != undefined) ? this.props.flex : '1' */,
        }}
      >
        <div
          className={
            !!this.props.value && this.props.value?.active
              ? "button"
              : "button button--disabled"
          }
          style={{
            backgroundColor: this.props?.value
              ?.getParent()
              .getColor(this.props?.value),
          }}
          onClick={() => {
            if (!!this.props.value) {
              this.props.value.getParent()?.toggle(this.props?.value);
            }
          }}
        >
          {this.props.title}
        </div>
        {this.props?.value?.active ? (
          <div
            className="list-item-section-content"
            style={{ flexDirection: this.props.column ? "column" : "row" }}
          >
            {this.props.children}
          </div>
        ) : (
          ""
        )}
      </div>
    ) : null;
  }
}

export default Section;
