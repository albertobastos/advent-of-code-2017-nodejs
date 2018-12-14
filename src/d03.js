console.time("d03");
const rl = require("./utils").getInputRL("d03");

function programReadLine(rl) {
  let input;
  rl.on("line", line => {
    input = Number(line);
  });

  rl.on("close", () => {
    let layer = getContainingLayer(input);
    let position = getPosition(layer, input);
    let distance = manhattanDistance({ x: 0, y: 0 }, position);

    console.log("Answer (part I):", distance);

    console.log("Answer (part II):", part2(input));

    console.timeEnd("d03");
  });
}

function getContainingLayer(n) {
  // each layer's bottom-right corner is a perfect square, we advance layers until we find the one that contains our number
  let layer = 1;
  while (n > getLowerRightValue(layer)) {
    layer++;
  }

  return layer;
}

function getPosition(layer, n) {
  // we start at the bottom-right corner and move backwards till we found it
  let value = getLowerRightValue(layer);
  let position = { x: layer - 1, y: layer - 1 }; // the grid is 0,0 based

  // lower-right to lower-left
  while (value !== n && position.x > -layer + 1) {
    if (value === n) break;
    position.x--;
    value--;
  }

  // lower-left to upper-left
  while (value !== n && position.y > -layer + 1) {
    if (value === n) break;
    position.y--;
    value--;
  }

  // upper-left to upper-right
  while (value !== n && position.x < layer - 1) {
    if (value === n) break;
    position.x++;
    value--;
  }

  // upper-right to lower-right
  while (value !== n && position.y < layer - 1) {
    if (value === n) break;
    position.y++;
    value--;
  }

  if (value !== n) {
    throw new Error("Unable to find position.");
  }

  return position;
}

function getLowerRightValue(layer) {
  return Math.pow(layer + layer - 1, 2);
}

function manhattanDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function part2(n) {
  let grid = {};
  let point = { x: 0, y: 0 };
  grid[`${point.x},${point.y}`] = 1;

  let getValue = function(grid, point) {
    let sum = 0;
    for (let x = point.x - 1; x <= point.x + 1; x++) {
      for (let y = point.y - 1; y <= point.y + 1; y++) {
        sum += grid[`${x},${y}`] || 0;
      }
    }
    return sum;
  };

  let dir = "r"; // (r)ight, (u)p, (l)eft, (d)own
  while (true) {
    // calculate value for current cell
    let value = getValue(grid, point);
    if (value >= n) {
      return value;
    }

    // store the value for following calculations
    grid[`${point.x},${point.y}`] = value;

    if (point.x >= 0 && point.y >= 0 && point.x === point.y + 1) {
      // lower-right corner, start going up
      dir = "u";
    } else if (
      point.x > 0 &&
      point.y < 0 &&
      Math.abs(point.x) === Math.abs(point.y)
    ) {
      // upper-right corner, start going left
      dir = "l";
    } else if (
      point.x < 0 &&
      point.y < 0 &&
      Math.abs(point.x) === Math.abs(point.y)
    ) {
      // upper-left corner, start going down
      dir = "d";
    } else if (
      point.x < 0 &&
      point.y > 0 &&
      Math.abs(point.x) === Math.abs(point.y)
    ) {
      // lower-left corner, start going right
      dir = "r";
    } else {
      // keep direction
    }

    // advance cursor
    switch (dir) {
      case "r":
        point.x++;
        break;
      case "u":
        point.y--;
        break;
      case "l":
        point.x--;
        break;
      case "d":
        point.y++;
        break;
    }
  }
}

programReadLine(rl);
