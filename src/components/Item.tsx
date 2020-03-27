import * as React from 'react';
import Rule from '../logic/Rule';
import ColorSection from './sections/ColorSection';
import CollectionSection from './sections/CollectionSection';
import SignedSection from './sections/SignedSection';
import ToggleSection from './sections/ToggleSection';
import SignedTextSection from './sections/SignedTextSection';
import FetchSection from './sections/FetchSection';
import EffectSection from './sections/EffectSection';
import MapIconSection from './sections/MapIconSection';
import AlertSoundSection from './sections/AlertSoundSection';
import CustomSoundSection from './sections/CustomSoundSection';

const DEFAULT_NAME = "Mirror of Kalandra";

class Item extends React.Component<{ item: Rule, selected: boolean, delete?: () => any, select?: (append: boolean, multiple: boolean) => any, duplicate?: () => any, alter?: (params: Object) => any }> {

    componentDidMount() {
    }


    render() {
        let item = this.props.item;

        return (
            <div className={"item"}>
                <div className="list-item-container">
                    <div className="list-item" onClick={(e) => { e.stopPropagation(); this.props?.select(e.ctrlKey, e.shiftKey); }} onContextMenu={() => { this.props?.alter({ active: !item.active }); }/*this.props.alter*/} style={{
                        border: (this.props.selected) ? "3px solid red" : "3px solid #444",
                        color: (this.props.selected) ? "#eee" : "",
                        // height: (!!this.props.item.group && this.props.item.group.collapsed) ? "5px" : "",
                        // marginBottom: (!!this.props.item.group && this.props.item.group.collapsed) ? "2px" : "",
                    }}>
                        <div className="list-item-header">
                            <div style={{ marginRight: 10, padding: "2px 4px", border: "3px solid #444", backgroundColor: (item.show) ? "#a5f7a5" : "#ff9393" }}>{item.show ? "Show" : "Hide"}</div>
                            <div className="list-item-header-box" style={{ backgroundColor: item.getColor(item.background), color: item.getColor(item.font), borderColor: item.getColor(item.border), fontSize: item.getSize() }}>
                                {/* <div className="list-item-header-box" style={{ backgroundColor: "red", color: "green", borderColor: "blue", fontSize: item.getSize() }}> */}
                                <p>{(!!this.props.item.title) ? this.props.item.title : DEFAULT_NAME}</p>
                            </div>
                            {/* <NumberInput style={{ width: "30px", flex: 0, marginLeft: "5px" }} min={30} max={45} value={item.size.value} onChange={(value) => { item.size.alter(value) }} /> */}
                            <div style={{ position: "absolute", height: "100%", top: "0px", right: "0px", display: "flex" }}>
                                <button className="button" style={{ width: "32px", height: "32px" }} onClick={(e) => { this.props?.duplicate(); e.stopPropagation(); }}>D</button>
                                <button className="button" style={{ width: "32px", height: "32px", marginLeft: "2px" }} onClick={(e) => { this.props?.delete(); e.stopPropagation(); }}>X</button>
                            </div>
                        </div>
                        {(item.active) ? <div className="list-item-inputs">
                            <div>
                                <ColorSection title="Background" flex={1} value={item.background} alter={this.props.alter} />
                                <ColorSection title="Font" flex={1} value={item.font} alter={this.props.alter} />
                                <ColorSection title="Border" flex={1} value={item.border} alter={this.props.alter} />
                            </div>
                            <div>
                                <EffectSection title="Effect" value={item.effect}></EffectSection>
                                <MapIconSection title="Map Icon" flex={1} value={item.icon}></MapIconSection>
                                <AlertSoundSection title="Alert Sound" value={item.alertsound}></AlertSoundSection>
                                <CustomSoundSection title="Custom Sound" value={item.customsound}></CustomSoundSection>
                            </div>

                            <div>
                                <CollectionSection title="Class" flex={2} value={item.class} />
                                <FetchSection title="Basetype" flex={4} value={item.basetype} />
                                <SignedTextSection title="Rarity" value={item.rarity} />
                                <SignedSection title="Quality" value={item.quality} />
                            </div>
                            <div>
                                <CollectionSection title="Explicit Mod" flex={2} value={item.explicit} />
                                <CollectionSection title="Prophecy" flex={2} value={item.prophecy} />
                                <CollectionSection title="Has Enchant" flex={2} value={item.enchantment} />
                                <CollectionSection title="Socket Group" flex={2} value={item.socketgroup} />
                            </div>
                            <div>
                                <SignedSection title="Area Level" min={1} value={item.arealevel} />
                                <SignedSection title="Item Level" min={1} value={item.itemlevel} />
                                <SignedSection title="Drop Level" min={1} value={item.droplevel} />
                                <SignedSection title="Sockets" min={1} max={6} value={item.sockets} />
                                <SignedSection title="Linked Sockets" min={1} max={6} value={item.linked} />
                                <SignedSection title="Corrupted Mods" value={item.corruptedmods} />
                            </div>
                            <div>
                                <SignedSection title="Gem Level" min={1} max={30} value={item.gemlevel} />
                                <SignedSection title="Stack Size" value={item.stacksize} />
                                <SignedSection title="Map Tier" value={item.maptier} />
                                <SignedSection title="Width" value={item.width} />
                                <SignedSection title="Height" value={item.height} />
                                <ToggleSection title="Identified" value={item.identified} />
                                <ToggleSection title="Corrupted" value={item.corrupted} />
                            </div>
                            <div>
                                <ToggleSection title="Any Enchant" value={item.anyenchantment} />
                                <ToggleSection title="Shaped Item" value={item.shaper} />
                                <ToggleSection title="Elder Item" value={item.elder} />
                                <ToggleSection title="Mirrored" value={item.mirrored} />
                                <ToggleSection title="Fractured" value={item.fractured} />
                                <ToggleSection title="Synthesised" value={item.synthesis} />
                                <ToggleSection title="Shaped Map" value={item.shapedmap} />
                            </div>
                        </div> : ""}
                    </div>
                </div>

            </div>
        );
    }
}

export default Item;