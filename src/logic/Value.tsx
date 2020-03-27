import Rule, { getRule } from "./Rule";

// number | string | boolean | Array<number> | Array<string> | { sign: string, value: number | string }

export default class Value<T> {
    parent: number;
    name: string;
    value: any;
    active: boolean;
    sign: string;

    constructor(ruleId: number, name: string, value: T) {
        this.parent = ruleId;
        this.name = name;
        this.value = value;
        this.active = false;
    }

    alter(value: T) {
        this.value = value;
        this.getParent()?.app?.reload();
    }

    getParent() {
        return getRule(this.parent);
    }

    print() {
        if (!this.active)
            return "";

        let value = this.value;
        //Sound type
        if (this.name == "PlayAlertSound")
            return `\t${this.name} ${this.value.id} ${this.value.volume}\n`;
        //CustomSound type
        else if (this.name == "CustomAlertSound")
            return `\t${this.name} ${(this.value.file.charAt(0) != `\"`) ? '\"' : ``}${this.value.file}${(this.value.file.charAt(this.value.file.length-1) != `\"`) ? '\"' : ``}\n`;
        //MinimapIcon type
        else if (this.name == "MinimapIcon")
            return `\t${this.name} ${this.value.size} ${this.value.color} ${this.value.shape}\n`;
        //PlayEffect type
        else if (this.name == "PlayEffect")
            return `\t${this.name} ${this.value.color} ${(this.value.temp) ? 'Temp' : ''}\n`;
        //Color or Collection type
        else if (this.value instanceof Array) {
            if (this.value.length == 0)
                return "";
            let arr = this.value.toString().split(",");
            value = "";
            for (let i = 0; i < arr.length; i++) {
                value += (isNaN(parseInt(arr[i]))) ? `\"${arr[i]}\" ` : `${arr[i]} `;
            }
        }
        //Signed type
        if (this.value.sign)
            value = `${this.value.sign} ${this.value.value}`;

        return `\t${this.name} ${value}\n`;
    }
}