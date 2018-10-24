import React from 'react';

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
          : 'Loaded'
        }
      </div>
    );
  }
}

export default Table;