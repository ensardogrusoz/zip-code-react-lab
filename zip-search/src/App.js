import React, { Component } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


function City(props) {
  return (
    <Card className="mx-auto my-3">
      <Card.Header>
        { props.cityInfo.LocationText }
      </Card.Header>
      <Card.Body>
        <ul>
          <li>{ "State: " + props.cityInfo.State }</li>
          <li>{ "Location: (" + props.cityInfo.Lat+", " + props.cityInfo.Long + ")"}</li>
          <li>{ "Population (estimated): " + props.cityInfo.EstimatedPopulation}</li>
          <li>{ "Total Wages: " + props.cityInfo.TotalWages }</li>
        </ul>
      </Card.Body>
    </Card>
  );
}

function ZipSearchField(props) {
  return (
    <div className="text-center mt-3 row justify-content-center">
    <label className="col-sm-1 col-form-label">Zip Code: </label>
    <input className="col-sm-2 form-control" type="text" maxLength="5" placeholder="Ex: 10016" onChange={(e) => props.onChange(e)}/>
  </div>);
  
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      zipCode: '',
    }
  }
  zipChange(e){
    this.setState({
      zipCode: e.target.value
    });

    let zip = e.target.value;

    if (zip.length === 5) {
    fetch("http://ctp-zip-api.herokuapp.com/zip/"+zip, {
      method: "GET"
    })
    .then(res => res.json())
    .then((res) => (
        this.setState({
          cities: res
        }),
        console.log("CITIES", this.state.cities)
    ))
      .catch(error => {
        console.log(error)
        this.setState({
          cites: []
        })
      })
    }
    
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField
          onChange={(e) => this.zipChange(e)}
         />
        <div>
        {
            this.state.cities.map(obj => (<City key={obj.RecordNumber} cityInfo={obj} />))
          }
          
        </div>
      </div>
    );
  }
}

export default App;
