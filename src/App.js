import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { todayDate: '',country: 'india', CountryToday: '', countryTotal: '', allCases: '', allDeaths: '', allRecovered: '', countryNames: [] };
  }

  getCountryData(a) {
    var data = '';
    fetch( `https://corona.lmao.ninja/v2/historical/${a}` )
    .then( r => r.json())
    .then( r => {
      data = r;
      var data1 = Object.values( data.timeline.cases );
      var todayDate = Object.keys( data.timeline.cases );
      todayDate = todayDate[ data1.length - 1 ];
      console.log( data );
      var today1 = data1[ data1.length - 1 ];
      var yes1 = data1[ data1.length - 2 ];
      this.setState({
        today : Number( today1 - yes1 ),
        total : today1,
        todayDate: todayDate
      });
      
    });
  }

  getAllData(a) {
    var data = '';
    fetch( 'https://corona.lmao.ninja/all' )
    .then( r => r.json())
    .then( r => {
      data = r;
      
      this.setState({
        allCases : data.cases,
        allDeaths: data.deaths,
        allRecovered: data.recovered
      });
      
    });
  }

  getCountryNames(){
    let countries;
    let countryNames = [];
    let country;
    fetch('https://corona.lmao.ninja/countries')
    .then(r => r.json())
    .then(r => {
      countries = r;
      for(country of countries){
        countryNames.push(country.country);
      }
      this.setState( {
        countryNames: countryNames
       });
    });
  }


  componentDidMount() {

    this.getCountryData( 'india' );
    this.getAllData();
    this.getCountryNames();

  }
  

  render() {

    const spanStyle = {
      display: 'inline-block',
      paddingRight: '25px',
      marginBottom: '15px'
    }
    const bStyle = {
      display: 'block',
    } 
    const selectStyle = {
      padding: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '4px',
      marginBottom: '25px',
      border: '3px solid #0c0e13'
    } 

    let countriesList = this.state.countryNames.length > 0
		&& this.state.countryNames.map((item, i) => {
		return (
			<option key={i} value={item}>{item}</option>
		)
	}, this);
    
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Covid-19</h1>
          <h2> WordWide: <span style={{textTransform: "capitalize"}}>  </span> </h2>
          <div>
            <span style={spanStyle}> Total Cases: <b style={bStyle}>{this.state.allCases}</b> </span>
            <span style={spanStyle}> Total Deaths: <b style={bStyle}>{this.state.allDeaths}</b> </span>
            <span style={{...spanStyle,paddingRight: 0}}>  Total Recovered: <b style={bStyle}>{this.state.allRecovered}</b> </span>
          </div>
          <h2> <span style={{textTransform: "capitalize"}}> {this.state.country}: </span> </h2>
          <div>
            <span style={spanStyle}> Cases Today [{this.state.todayDate}]: <b style={bStyle}>{ this.state.today }</b> </span>
            <span style={spanStyle}> Total Cases: <b style={bStyle}>{ this.state.total }</b> </span>
          </div>

          <select style={ selectStyle } onChange={(event) => this.getCountryData(event.target.value)}>
            <option value="india">India</option>
            { countriesList }
          </select>
          
        </header>
      </div>
    );
  }


}
export default App;


