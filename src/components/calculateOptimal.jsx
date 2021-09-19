import React from "react";

class CalculateOptimal extends React.Component {
  state = { nVerts: 0 };

  ModifiedFloydWarshall = (timetables) => {
    const nVerts = timetables.length * 24;

    // Initialize Array
    let dist = Array.from({ length: nVerts }, (a) =>
      Array(nVerts).fill(Infinity)
    );
    let turns = Array.from({ length: nVerts }, (a) => Array(nVerts).fill(0));

    // Populate edges
    timetables.map((ttable, tt_idx) => {
      [...Array(24).keys()].map((gmtHour) => {
        const localHour = gmtHour + ttable.gmtOffset;
        const from_vert = tt_idx * 24 + gmtHour;
        if (ttable.availability.includes(localHour)) {
          const to_vert = ((tt_idx + 1) % timetables.length) * 24 + gmtHour;
          dist[from_vert][to_vert] = 0;
          turns[from_vert][to_vert] = 2;
        } else {
          const to_vert = tt_idx * 24 + ((gmtHour + 1) % 24);
          dist[from_vert][to_vert] = 1;
          turns[from_vert][to_vert] = 1;
        }
      });
    });

    // Algorithm
    [...Array(nVerts).keys()].map((k) => {
      [...Array(nVerts).keys()].map((i) => {
        [...Array(nVerts).keys()].map((j) => {
          if (
            this.weight(dist[i][j], turns[i][j]) >
            this.weight(dist[i][k], turns[i][k]) +
              this.weight(dist[k][j], turns[k][j])
          ) {
            console.log("updating");
            dist[i][j] = dist[i][k] + dist[k][j];
            turns[i][j] = turns[i][k] + turns[k][j];
          }
        });
      });
    });

    const rounds_per_day = dist.map((row, ri) =>
      row.map(
        (d, ci) =>
          (((turns[ri][ci] - 1) / dist[ri][ci]) * 24) / timetables.length
      )
    );

    return turns;
  };

  weight = (dist, turns) => {
    if (turns === 0) {
      return Infinity;
    } else {
      return dist / turns;
    }
  };

  render() {
    const { timetables } = this.props;
    const val = this.ModifiedFloydWarshall(timetables);
    return <p>{JSON.stringify(val)}</p>;
  }
}

export default CalculateOptimal;
