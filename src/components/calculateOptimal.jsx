import React from "react";
import gmtToLocalTime from "./common/timezone";

class CalculateOptimal extends React.Component {
  calculateRoundsPerDay = (
    timetables,
    ttIdx,
    elapsedHours,
    nTurns,
    gmtHour,
    visited
  ) => {
    const ttable = timetables[ttIdx];
    const local_hour = gmtToLocalTime(gmtHour, ttable.gmtOffset);
    const vertexID = ttable.id + " " + gmtHour;

    if (visited.includes(vertexID)) {
      return { vertexID, nTurns, elapsedHours, final: false };
    }
    visited.push(vertexID);

    let rpd;
    if (ttable.availability.includes(local_hour)) {
      rpd = this.calculateRoundsPerDay(
        timetables,
        (ttIdx + 1) % timetables.length,
        elapsedHours,
        nTurns + 1,
        gmtHour,
        visited
      );
    } else {
      rpd = this.calculateRoundsPerDay(
        timetables,
        ttIdx,
        elapsedHours + 1,
        nTurns,
        (gmtHour + 1) % 24,
        visited
      );
    }

    if (rpd.final) {
      return rpd;
    }
    if (rpd.vertexID === vertexID) {
      rpd.nTurns = rpd.nTurns - nTurns;
      rpd.elapsedHours = rpd.elapsedHours - elapsedHours;
      rpd.final = true;
      rpd.rpd = rpd.nTurns / timetables.length / (rpd.elapsedHours / 24);
      return rpd;
    }
    return rpd;
  };

  getArrayPermutations = (timetables, idx) => {
    // uses Heap's Algorithm, but doesn't touch the first element
    // because it doesn't matter who starts
    const n = timetables.length - 1;
    let permutation = [...timetables];
    let c = new Array(n).fill(0);
    let permutations = [[...permutation]];

    let i = 1;
    while (i < n) {
      if (c[i] < i) {
        if (i % 2 === 0) {
          const swap = permutation[0 + 1];
          permutation[0 + 1] = permutation[i + 1];
          permutation[i + 1] = swap;
        } else {
          const swap = permutation[c[i] + 1];
          permutation[c[i] + 1] = permutation[i + 1];
          permutation[i + 1] = swap;
        }
        permutations.push([...permutation]);
        c[i]++;
        i = 1;
      } else {
        c[i] = 0;
        i++;
      }
    }
    return permutations;
  };

  calculateOptimal = (timetables) => {
    const permutations = this.getArrayPermutations(timetables);
    let solutions = permutations.map((ttables) => {
      const solution = this.calculateRoundsPerDay(ttables, 0, 0, 0, 0, []);
      return { timetables: ttables, solution };
    });
    solutions.sort((solA, solB) => solB.solution.rpd - solA.solution.rpd);
    return solutions;
  };

  render() {
    const { timetables } = this.props;
    const solutions = this.calculateOptimal(timetables);
    return (
      <div>
        {solutions.map((solution) => (
          <p>
            {solution.timetables.map((ttable) => " " + ttable.name) +
              ": " +
              solution.solution.rpd +
              " rounds per day"}
          </p>
        ))}
      </div>
    );
  }
}

export default CalculateOptimal;
