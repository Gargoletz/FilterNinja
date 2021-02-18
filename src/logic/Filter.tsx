import Rule from "./Rule";

export function printFilter(items: Rule[]) {
  let output = "";
  items.forEach((val, i) => {
    output += val.print();
  });
  console.log(output);
  return output;
}

export function loadFilter(getNewRule: () => Rule, input: string): Rule[] {
  let lines = input.split("\n");
  let output: Rule[] = [];
  let rule: Rule;
  lines.forEach((line) => {
    line = line.trim();
    if (line.length > 0) {
      if (
        line.split(" ").includes("Show") ||
        line.split(" ").includes("Hide")
      ) {
        if (rule) output.push(rule);
        rule = getNewRule();
        rule.show = line.split(" ").includes("Show");
      } else if (line.charAt(0) != "#") {
        let words = line.split("#")[0].split(" ");
        words = words.reduce((p, c, i) => {
          return c.trim().length > 0 ? [...p, c] : [...p];
        }, []);
        rule.loadValue(words[0], words.splice(1, words.length));
      }
    }
  });
  output.push(rule);
  console.log(output);

  return output;
}
