console.time("d10");
const rl = require("./utils").getInputRL("d10");

function programReadLine(rl) {
  let INITIAL_LIST;
  let LENGTHS;
  rl.on("line", line => {
    if (!INITIAL_LIST) {
      // first line
      INITIAL_LIST = Array.apply(null, { length: Number(line) }).map(Number.call, Number);
    } else {
      // second line
      LENGTHS = line.split(",").map(Number);
    }
  });

  rl.on("close", () => {
    let result = run(INITIAL_LIST.slice(), LENGTHS);
    console.log("Answer (part I):", result.part1);
    console.log("Answer (part II):", result.part2);

    console.timeEnd("d09");
  });
}

function run(list, lengths) {
  let data = {
    part1: null,
    part2: null,
    cursor: 0,
    skipSize: 0,
    list: list
  };

  lengths.forEach(length => {
    data.list = doRotate(data.list, data.cursor, length);
    data.cursor = (data.cursor + length + data.skipSize) % data.list.length;
    data.skipSize++;
    //printStatus(data);
  });

  data.part1 = data.list[0] * data.list[1];

  return data;
}

function doRotate(list, cursor, length) {
  let newList = list.slice();
  for (let i = 0; i < length; i++) {
    let pos = (cursor + i) % list.length;
    let rPos = (cursor + length - 1 - i) % list.length;
    newList[pos] = list[rPos];
  }
  return newList;
}

function printStatus(data) {
  console.log(data.list.map((elem, index) => (index === data.cursor ? `[${elem}]` : elem)).join(" "));
}

programReadLine(rl);
