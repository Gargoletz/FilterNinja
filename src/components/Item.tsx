import * as React from "react";
import Rule from "../logic/Rule";
import NumberInput from "./inputs/NumberInput";
import ColorSection from "./sections/ColorSection";
import CollectionSection from "./sections/CollectionSection";
import SignedSection from "./sections/SignedSection";
import ToggleSection from "./sections/ToggleSection";
import SignedTextSection from "./sections/SignedTextSection";
import FetchSection from "./sections/FetchSection";
import EffectSection from "./sections/EffectSection";
import MapIconSection from "./sections/MapIconSection";
import AlertSoundSection from "./sections/AlertSoundSection";
import CustomSoundSection from "./sections/CustomSoundSection";
import AppContext from "../logic/AppContext";
import App from "../App";

const DEFAULT_NAME = "Mirror of Kalandra";

class Item extends React.Component<{ item: Rule }> {
  static contextType = AppContext;

  render() {
    const { item } = this.props;
    const { alter, select, selected } = this.context;

    return (
      <div className={"item"}>
        <div className="list-item-container">
          <div
            className="list-item"
            onClick={(e) => {
              select(item, e.ctrlKey, e.shiftKey);
              e.stopPropagation();
            }}
          >
            <RuleHeader item={item} />
            <RuleSections
              item={item}
              alter={(params: any) => {
                alter(item, params);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

function ToggleShowButton(props: { rule: Rule }) {
  const { alter } = React.useContext(AppContext);
  const { rule } = props;

  return rule ? (
    <div
      style={{
        position: "absolute",
        left: -76,
        width: 50,
        padding: "4px 8px",
        borderRadius: 2,
        color: "white",
        backgroundColor: rule.show ? "#588a58" : "#ff9393",
      }}
      onClick={(e) => {
        alter(rule, { show: !rule.show });
        e.stopPropagation();
      }}
    >
      {rule.show ? "Show" : "Hide"}
    </div>
  ) : null;
}

function RuleBox(props: { item: Rule; selected: boolean }) {
  const { item, selected } = props;

  const { select, alter } = React.useContext(AppContext);

  return (
    <div
      className="list-item-header-background"
      style={{
        border: selected ? "4px solid red" : "",
      }}
    >
      <ToggleShowButton rule={item} />
      <div
        className="list-item-header-box"
        style={{
          backgroundColor: item.getColor(item.background),
          color: item.getTextColor(),
          borderColor: item.getColor(item.border),
          fontSize: item.getSize(),
        }}
      >
        <p>{item.getTitle()}</p>
      </div>
      <NumberInput
        flex={0}
        containerStyle={{ position: "absolute", right: -40 }}
        min={30}
        max={45}
        value={item.size.value}
        onChange={(value) => {
          item.size.alter(value);
        }}
      />
    </div>
  );
}

function RuleHeader(props: { item: Rule }) {
  const { item } = props;
  const { alter, selected } = React.useContext(AppContext);
  return (
    <div
      className="list-item-header"
      onContextMenu={() => {
        alter(item, { active: !item.active });
      }}
    >
      <RuleBox item={item} selected={selected.includes(item)} />
    </div>
  );
}

function RuleSections(props: { item: Rule; alter: (p: any) => any }) {
  const { item, alter } = props;
  const { editedRule, openEdit } = React.useContext(AppContext);
  return item && item.active ? (
    <>
      <div className="list-item-inputs">
        <ColorSection
          title="Background"
          flex={1}
          value={item.background}
          alter={alter}
        />
        <ColorSection title="Font" flex={1} value={item.font} alter={alter} />
        <ColorSection
          title="Border"
          flex={1}
          value={item.border}
          alter={alter}
        />
        <EffectSection title="Effect" value={item.effect}></EffectSection>
        <MapIconSection
          title="Map Icon"
          flex={1}
          value={item.icon}
        ></MapIconSection>
        <AlertSoundSection
          title="Alert Sound"
          value={item.alertsound}
        ></AlertSoundSection>
        <CustomSoundSection
          title="Custom Sound"
          value={item.customsound}
        ></CustomSoundSection>
        <SignedTextSection title="Rarity" value={item.rarity} />
        <SignedSection title="Quality" value={item.quality} />
        <CollectionSection
          title="Explicit Mod"
          flex={2}
          value={item.explicit}
        />
        <CollectionSection title="Prophecy" flex={2} value={item.prophecy} />
        <CollectionSection
          title="Has Enchant"
          flex={2}
          value={item.enchantment}
        />
        <CollectionSection
          title="Socket Group"
          flex={2}
          value={item.socketgroup}
        />
        <SignedSection title="Area Level" min={1} value={item.arealevel} />
        <SignedSection title="Item Level" min={1} value={item.itemlevel} />
        <SignedSection title="Drop Level" min={1} value={item.droplevel} />
        <SignedSection title="Sockets" min={1} max={6} value={item.sockets} />
        <SignedSection
          title="Linked Sockets"
          min={1}
          max={6}
          value={item.linked}
        />
        <SignedSection title="Corrupted Mods" value={item.corruptedmods} />
        <SignedSection
          title="Gem Level"
          min={1}
          max={30}
          value={item.gemlevel}
        />
        <SignedSection title="Stack Size" value={item.stacksize} />
        <SignedSection title="Map Tier" value={item.maptier} />
        <SignedSection title="Width" value={item.width} />
        <SignedSection title="Height" value={item.height} />
        <ToggleSection title="Identified" value={item.identified} />
        <ToggleSection title="Corrupted" value={item.corrupted} />
        <ToggleSection title="Any Enchant" value={item.anyenchantment} />
        <ToggleSection title="Shaped Item" value={item.shaper} />
        <ToggleSection title="Elder Item" value={item.elder} />
        <ToggleSection title="Mirrored" value={item.mirrored} />
        <ToggleSection title="Fractured" value={item.fractured} />
        <ToggleSection title="Synthesised" value={item.synthesis} />
        <ToggleSection title="Shaped Map" value={item.shapedmap} />

        <CollectionSection title="Class" flex={2} value={item.class} />
        <FetchSection title="Basetype" flex={4} value={item.basetype} />
      </div>
      <button onClick={() => openEdit(editedRule == item ? undefined : item)}>
        {editedRule == item ? "Done" : "Add more..."}
      </button>
    </>
  ) : null;
}

function Toolbar(props) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        top: "0px",
        right: "0px",
        display: "flex",
      }}
    >
      <button
        className="button"
        style={{ width: "32px", height: "32px" }}
        onClick={(e) => {
          this.props?.duplicate();
          e.stopPropagation();
        }}
      >
        D
      </button>
      <button
        className="button"
        style={{ width: "32px", height: "32px", marginLeft: "2px" }}
        onClick={(e) => {
          this.props?.delete();
          e.stopPropagation();
        }}
      >
        X
      </button>
    </div>
  );
}

export default Item;
