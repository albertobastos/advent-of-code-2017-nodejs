console.time("d10");
const rl = require("./utils").getInputRL("d10");

const PART2_FIXED_SUFFIX = [17, 31, 73, 47, 23];
const PART2_DEFAULT_ROUNDS = 64;

function programReadLine(rl) {
  let INITIAL_LIST;
  let LENGTHS_PART1;
  let LENGTHS_PART2;
  rl.on("line", line => {
    if (!INITIAL_LIST) {
      // first line
      INITIAL_LIST = Array.apply(null, { length: Number(line) }).map(
        Number.call,
        Number
      );
    } else {
      // second line
      LENGTHS_PART1 = line.split(",").map(Number);
      LENGTHS_PART2 = [];
      for (let i = 0; i < line.length; i++) {
        LENGTHS_PART2.push(line.charCodeAt(i));
      }
      LENGTHS_PART2 = [...LENGTHS_PART2, ...PART2_FIXED_SUFFIX];
    }
  });

  rl.on("close", () => {
    console.log(
      "Answer (part I):",
      runPart1(INITIAL_LIST.slice(), LENGTHS_PART1).result
    );
    console.log(
      "Answer (part II):",
      runPart2(INITIAL_LIST.slice(), LENGTHS_PART2).result
    );

    console.timeEnd("d10");
  });
}

function runPart1(list, lengths) {
  let data = {
    result: null,
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

  data.result = data.list[0] * data.list[1];

  return data;
}

function runPart2(list, lengths, rounds = PART2_DEFAULT_ROUNDS) {
  let data = {
    result: null,
    cursor: 0,
    skipSize: 0,
    list: list
  };

  for (let round = 1; round <= rounds; round++) {
    lengths.forEach(length => {
      data.list = doRotate(data.list, data.cursor, length);
      data.cursor = (data.cursor + length + data.skipSize) % data.list.length;
      data.skipSize++;
      //printStatus(data);
    });
  }

  let dense = new Array(data.list.length / 16).fill(null);
  dense = dense.map((_, index) =>
    data.list
      .slice(index * 16, (index + 1) * 16)
      .reduce((xor, curr) => xor ^ curr, 0)
  );

  data.result = dense
    .map(n => n.toString(16))
    .map(hex => (hex.length < 2 ? `0${hex}` : hex))
    .join("");

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
  console.log(
    data.list
      .map((elem, index) => (index === data.cursor ? `[${elem}]` : elem))
      .join(" ")
  );
}

programReadLine(rl);
