import React from 'react';
import PropTypes from 'prop-types';

function Standings(props) {
  const { table } = props;
  const data = table.standings[0].table;
  console.log(data);
  return (
    <div>
      <h1>{table.competition.name}</h1>
      <p>{table.competition.area.name}</p>
      <p>As of {table.competition.lastUpdated}</p>
      <p>Season {table.season.startDate} to {table.season.endDate}</p>
      
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Club</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Goals For</th>
            <th>Goals Against</th>
            <th>Goals Differential</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map(team => {
            return (
              <tr key={team.team.name}>
                <td>{team.position}</td>
                <td><img src={team.team.crestUrl} height="20" width="20"/>{team.team.name}</td>
                <td>{team.playedGames}</td>
                <td>{team.won}</td>
                <td>{team.draw}</td>
                <td>{team.lost}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.goalDifference}</td>
                <td>{team.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Standings.propTypes = {
  table: PropTypes.object.isRequired
};

class Table extends React.Component {
  state = {
    tableData: null,
  }
  componentDidMount() {
    fetch('https://api.football-data.org/v2/competitions/2021/standings', {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.API_KEY
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState(() => ({ 
        tableData: json
      }));
    });
  }
  render() {
    return (
      <div>
        {!this.state.tableData
          ? 'Loading'
          : <Standings table={this.state.tableData} />
        }
      </div>
    );
  }
}

export default Table;