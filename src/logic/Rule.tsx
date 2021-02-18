import Value from "./Value";
import App from "../App";
import { textChangeRangeIsUnchanged } from "typescript";

const DEFAULT_NAME = "Mirror of Klanadra";

export function getRule(id: number) {
  for (let i = 0; i < App?.items.length; i++) {
    let e = App.items[i];
    if (e.id == id) return e;
  }
  return undefined;
}

function randomizeColor() {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    255,
  ];
}

export default class Rule {
  app: App;

  id: number;
  title: string;
  active: boolean;
  show: boolean;

  size: Value<number>;

  background: Value<Array<number>>;
  font: Value<Array<number>>;
  border: Value<Array<number>>;

  alertsound: Value<{ id: number; volume: number }>;
  customsound: Value<{ file: string }>;
  icon: Value<{ size: number; color: string; shape: string }>;
  effect: Value<{ color: string; temp?: boolean }>;

  class: Value<Array<string>>;
  basetype: Value<Array<string>>;
  explicit: Value<Array<string>>;
  prophecy: Value<Array<string>>;
  socketgroup: Value<Array<string>>;
  enchantment: Value<string[]>;

  rarity: Value<{ sign: string; value: string }>;

  sockets: Value<{ sign: string; value: number }>;
  linked: Value<{ sign: string; value: number }>;
  quality: Value<{ sign: string; value: number }>;
  arealevel: Value<{ sign: string; value: number }>;
  itemlevel: Value<{ sign: string; value: number }>;
  droplevel: Value<{ sign: string; value: number }>;
  gemlevel: Value<{ sign: string; value: number }>;
  stacksize: Value<{ sign: string; value: number }>;
  maptier: Value<{ sign: string; value: number }>;
  width: Value<{ sign: string; value: number }>;
  height: Value<{ sign: string; value: number }>;
  corruptedmods: Value<{ sign: string; value: number }>;

  identified: Value<boolean>;
  corrupted: Value<boolean>;
  shaper: Value<boolean>;
  elder: Value<boolean>;
  anyenchantment: Value<boolean>;
  mirrored: Value<boolean>;
  fractured: Value<boolean>;
  synthesis: Value<boolean>;
  shapedmap: Value<boolean>;

  constructor(app: App, title: string) {
    this.app = app;
    this.id = Math.floor(Math.random() * 2 ** 14);
    this.title = title;
    this.active = false;
    this.show = true;

    this.size = new Value(
      this.id,
      "SetFontSize",
      Math.floor(Math.random() * 15) + 30
    );
    this.size.active = true;
    this.background = new Value(this.id, "SetBackgroundColor", [0, 0, 0, 255]);
    this.font = new Value(this.id, "SetTextColor", [255, 255, 255, 255]);
    this.border = new Value(this.id, "SetBorderColor", [0, 0, 0, 255]);

    this.alertsound = new Value(this.id, "PlayAlertSound", {
      id: 1,
      volume: 150,
    });
    this.customsound = new Value(this.id, "CustomAlertSound", {
      file: "testfile",
    });
    this.icon = new Value(this.id, "MinimapIcon", {
      size: 0,
      color: "red",
      shape: "circle",
    });
    this.effect = new Value(this.id, "PlayEffect", { color: "red" });

    this.class = new Value(this.id, "Class", []);
    this.basetype = new Value(this.id, "BaseType", []);
    this.explicit = new Value(this.id, "HasExplicitMod", []);
    this.prophecy = new Value(this.id, "Prophecy", []);
    this.socketgroup = new Value(this.id, "SocketGroup", []);
    this.enchantment = new Value(this.id, "HasEnchantment", []);

    this.rarity = new Value(this.id, "Rarity", { sign: "<", value: "Normal" });
    this.quality = new Value(this.id, "Quality", { sign: "<", value: 0 });
    this.arealevel = new Value(this.id, "AreaLevel", { sign: "<", value: 0 });
    this.itemlevel = new Value(this.id, "ItemLevel", { sign: "<", value: 0 });
    this.droplevel = new Value(this.id, "DropLevel", { sign: "<", value: 0 });
    this.sockets = new Value(this.id, "Sockets", { sign: "<", value: 0 });
    this.linked = new Value(this.id, "LinkedSockets", { sign: "<", value: 0 });
    this.gemlevel = new Value(this.id, "GemLevel", { sign: "<", value: 0 });
    this.stacksize = new Value(this.id, "StackSize", { sign: "<", value: 0 });
    this.maptier = new Value(this.id, "MapTier", { sign: "<", value: 0 });
    this.width = new Value(this.id, "Width", { sign: "<", value: 0 });
    this.height = new Value(this.id, "Height", { sign: "<", value: 0 });
    this.corruptedmods = new Value(this.id, "CorruptedMods", {
      sign: "<",
      value: 0,
    });

    this.identified = new Value(this.id, "Identified", false);
    this.corrupted = new Value(this.id, "Corrupted", false);
    this.elder = new Value(this.id, "ElderItem", false);
    this.shaper = new Value(this.id, "ShaperItem", false);
    this.mirrored = new Value(this.id, "Mirrored", false);
    this.anyenchantment = new Value(this.id, "AnyEnchantment", false);
    this.fractured = new Value(this.id, "FracturedItem", false);
    this.synthesis = new Value(this.id, "SynthesisedItem", false);
    this.shapedmap = new Value(this.id, "ShapedMap", false);
  }

  clone() {
    let rule = new Rule(this.app, this.title);
    for (let i = 0; i < Object.keys(this).length; i++) {
      let key = Object.keys(this)[i];
      if (key != "id" && key != "active") {
        if (this[key] instanceof Value) {
          if ((this[key] as Value<any>).active) {
            rule[key] = new Value(rule.id, this[key].name, this[key].value);
            rule[key].active = true;
          }
        } else rule[key] = this[key];
      }
    }

    return rule;
  }

  getTitle() {
    return !!this.title
      ? this.basetype.value.length > 0
        ? this.basetype.value[0]
        : this.class.value.length > 0
        ? this.class.value[0]
        : this.title
      : DEFAULT_NAME;
  }

  getSize() {
    return 21 + (Math.max(30, this.size.value) - 30) * 0.5 + "px";
  }

  getDefaultColor() {
    let rarity = this.rarity.value.value;
    if (rarity) {
      switch (rarity.toLowerCase()) {
        case "normal":
          return [200, 200, 200];
        case "magic":
          return [136, 136, 255];
        case "rare":
          return [255, 255, 119];
        case "unique":
          return [175, 96, 37];
      }
    }

    return [255, 255, 255];
  }

  arrayToColor(a) {
    return `rgb(${a[0]},${a[1]},${a[2]})`;
  }

  getTextColor() {
    return this.font.active
      ? this.getColor(this.font)
      : this.arrayToColor(this.getDefaultColor());
  }

  getColor(color) {
    return this.arrayToColor(color.value);
  }

  toggle(value) {
    value.active = !value.active;
    // this.group.app.reload();
  }

  loadValue(key: string, values: string[]) {
    Object.keys(this).forEach((e, i) => {
      if (this[e] && this[e] instanceof Value) {
        if (this[e].name == key) {
          //Color type
          if (values.length == 3 || values.length == 4) {
            let abort = false;
            values.forEach((f) => {
              if (isNaN(parseInt(f))) abort = true;
            });
            if (!abort) {
              this[e].active = true;
              this[e].value = [];
              values.forEach((f) => {
                this[e]?.value.push(parseInt(f));
              });
              if (values.length == 3) this[e].value.push(255);

              return;
            }
          }
          //Signed type
          if (
            values.length == 2 &&
            ["<=", "<", "=", ">", ">="].includes(values[0])
          ) {
            this[e].active = true;
            this[e].value = { sign: values[0], value: values[1] };
            return;
          }
          //Boolean type
          if (values[0] == "true" || values[0] == "false") {
            this[e].active = true;
            this[e].value = values[0] == "true";
            return;
          }
          //Number type
          if (values.length == 1 && !isNaN(parseInt(values[0]))) {
            this[e].active = true;
            this[e].value = parseInt(values[0]);
            return;
          }
          if (
            values.length == 1 &&
            ["Normal", "Magic", "Rare", "Unique"].includes(values[0])
          ) {
            this[e].active = true;
            this[e].value = { sign: "=", value: values[0] };
            return;
          }
          //Sound type
          if (key == "PlayAlertSound") {
            this[e].active = true;
            this[e].value = {
              id: parseInt(values[0]),
              volume: values[1] ? parseInt(values[1]) : 150,
            };
            return;
          }
          //CustomSound type
          if (key == "CustomAlertSound") {
            this[e].active = true;
            this[e].value = { file: values[0] };
            return;
          }
          //MinimapIcon type
          if (key == "MinimapIcon" && values.length >= 3) {
            this[e].active = true;
            this[e].value = {
              size: parseInt(values[0]),
              color: values[1],
              shape: values[2],
            };
            return;
          }
          //PlayEffect type
          if (key == "PlayEffect") {
            this[e].active = true;
            this[e].value = { color: values[0] };
            if (values[1] && values[1] == "Temp") this[e].value.temp = true;
            return;
          }
          //Collection type
          if (values.length > 0) {
            this[e].active = true;
            this[e].value = [];
            values
              .reduce((p, c) => {
                return c.charAt(0) != '"' && c.charAt(c.length) == '"'
                  ? p + c
                  : `${p} ${c}`;
              })
              .split(`\"`)
              .forEach((s) => {
                if (s.trim().length > 0 && !["=="].includes(s.trim()))
                  this[e].value.push(s);
              });
            return;
          } else {
            console.log("error", values);
            return;
          }
        }
      }
    });
  }

  print() {
    let s = (this.show ? "Show" : "Hide") + "\n";

    for (let i = 0; i < Object.keys(this).length; i++) {
      let key = Object.keys(this)[i];
      if (this[key] instanceof Value) {
        s += this[key]?.print();
      }
    }
    return s.length > 5 ? s : "";
  }
}
