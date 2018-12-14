console.time("d04");
const rl = require("./utils").getInputRL("d04");

function programReadLine(rl) {
  let simpleValidCount = 0;
  let complexValidCount = 0;
  rl.on("line", line => {
    let arr = line.split(" ");

    if (arr.length === new Set(arr).size) {
      // no words repeated, valid for simple security
      simpleValidCount++;
    }

    // we reorder all passphrase words alphabetically (if two can be rearranged, now they are the same!)
    let arr2 = arr.map(word =>
      word
        .split("")
        .sort()
        .join("")
    );
    if (arr2.length === new Set(arr2).size) {
      // no rearranged words repeated, valid for added security
      complexValidCount++;
    }
  });

  rl.on("close", () => {
    console.log("Answer (part I):", simpleValidCount);
    console.log("Answer (part II):", complexValidCount);
    console.timeEnd("d04");
  });
}

programReadLine(rl);
