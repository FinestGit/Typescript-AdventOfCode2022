import * as fs from "fs";

const main = (fileName) => {
  fs.readFile(fileName, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return;
    }

    const stringifiedDataWithEscapeCharacters = data.split(/\n/g);

    const accumulatedGroups = groupDataBeforeSpaces(
      stringifiedDataWithEscapeCharacters
    );

    const summedGroups = sumGroups(accumulatedGroups);

    const largest = getLargestFromGroup(summedGroups);

    console.log(largest);

    const topThreeTotal = getTopThreeTotal(summedGroups);

    console.log(topThreeTotal);
  });

  const groupDataBeforeSpaces = (data: string[]): string[][] => {
    const regex = /^[\r]+$/;
    let tempAccumulator: string[] = [];
    const fullyAccumulated: string[][] = [];
    for (let item of data) {
      if (regex.test(item)) {
        fullyAccumulated.push(tempAccumulator);
        tempAccumulator = [];
      } else {
        tempAccumulator.push(item);
      }
    }

    fullyAccumulated.push(tempAccumulator);

    return fullyAccumulated;
  };

  const sumGroups = (data: string[][]): number[] => {
    const summedGroups: number[] = [];

    for (let subData of data) {
      let accumulator = 0;
      for (let item of subData) {
        const stringifiedItemWithoutEscapeCharacters = item.split(/\r/g)[0];
        accumulator =
          accumulator + parseInt(stringifiedItemWithoutEscapeCharacters);
      }
      summedGroups.push(accumulator);
    }

    return summedGroups;
  };

  const getLargestFromGroup = (data: number[]): number => {
    let largest = 0;

    for (let item of data) {
      if (item > largest) {
        largest = item;
      }
    }

    return largest;
  };

  const getTopThreeTotal = (data: number[]): number => {
    const topThree: number[] = data.sort((a, b) => b - a).slice(0, 3);
    console.log(topThree);
    let accumulator = 0;

    for (let item of topThree) {
      accumulator = accumulator + item;
    }

    return accumulator;
  };
};

const args: string[] = process.argv.slice(2);

main(args[0]);
