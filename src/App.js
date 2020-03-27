import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { country: 'india', CountryTodayCases: '', CountryTodayDeaths: '',  countryTotal_cases: '', countryTotal_active_cases: '', countryTotal_serious_cases : '', countryTotal_recovered: '', countryTotal_unresolved: '', countryTotal_deaths: '', globalTotal_cases: '', globalTotal_active_cases: '', globalTotal_serious_cases: '', globalTotal_recovered: '', globalTotal_unresolved: '', globalTotal_deaths: '', globalTotal_new_cases_today: '', globalTotal_new_deaths_today: '', globalTotal_unresolved: '', countryNames: ["Afghanistan","Albania","Algeria","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bangladesh","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Ivory Coast","Central African Republic","Chad","Chile","China","Colombia","Congo","Democratic Republic of Congo","Costa Rica","Croatia","Cuba","Cyprus","Czechia","Denmark","Diamond Princess","Djibouti","Dominican Republic","DR Congo","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Fiji","Finland","France","French Guiana","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Greenland","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Korea","Kosovo","Kuwait","Kyrgyzstan","Lao","Latvia","Lebanon","Lesotho","Liberia","Libya","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Mali","Mauritania","Mexico","Moldova","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Republic of Kosovo","Romania","Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","UAE","Uganda","United Kingdom","Ukraine","USA","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Western Sahara","Yemen","Zambia","Zimbabwe"], countrieCodes : ["AF","AL","DZ","AO","AR","AM","AU","AT","AZ","BS","BD","BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","KH","CM","CA","CI","CF","TD","CL","CN","CO","CG","CD","CR","HR","CU","CY","CZ","DK","DP","DJ","DO","CD","EC","EG","SV","GQ","ER","EE","ET","FK","FJ","FI","FR","GF","TF","GA","GM","GE","DE","GH","GR","GL","GT","GN","GW","GY","HT","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KP","XK","KW","KG","LA","LV","LB","LS","LR","LY","LT","LU","MK","MG","MW","MY","ML","MR","MX","MD","MN","ME","MA","MZ","MM","NA","NP","NL","NC","NZ","NI","NE","NG","KP","NO","OM","PK","PS","PA","PG","PY","PE","PH","PL","PT","PR","QA","XK","RO","RU","RW","SA","SN","RS","SL","SG","SK","SI","SB","SO","ZA","KR","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TT","TN","TR","TM","AE","UG","GB","UA","US","UY","UZ","VU","VE","VN","EH","YE","ZM","ZW"] };
  }

  getCountryData(a='IN') {

    var data = '';
    const {options, value, selectedIndex} = a;
    fetch( `https://thevirustracker.com/free-api?countryTotal=${value}` )
    .then( r => r.json())
    .then( r => {
      data = r;
      this.setState({
        countryTotal_cases : data['countrydata'][0].total_cases.toLocaleString(),
        countryTotal_active_cases : data['countrydata'][0].total_active_cases.toLocaleString(),
        countryTotal_serious_cases : data['countrydata'][0].total_serious_cases.toLocaleString(),
        countryTotal_recovered : data['countrydata'][0].total_recovered.toLocaleString(),
        countryTotal_unresolved : data['countrydata'][0].total_unresolved.toLocaleString(),
        countryTotal_deaths : data['countrydata'][0].total_deaths.toLocaleString(),
        CountryTodayCases: data['countrydata'][0].total_new_cases_today.toLocaleString(),
        CountryTodayDeaths : data['countrydata'][0].total_new_deaths_today.toLocaleString(),
        country: options[selectedIndex].innerText

      });

    });
  }

  getAllData(a) {
    var data = '';
    fetch( 'https://thevirustracker.com/free-api?global=stats' )
    .then( r => r.json())
    .then( r => {
      data = r;
      
      this.setState({
        globalTotal_cases : data.results[0].total_cases.toLocaleString(),
        globalTotal_active_cases : data.results[0].total_active_cases.toLocaleString(),
        globalTotal_serious_cases : data.results[0].total_serious_cases.toLocaleString(),
        globalTotal_recovered: data.results[0].total_recovered.toLocaleString(),
        globalTotal_unresolved: data.results[0].total_unresolved.toLocaleString(),
        globalTotal_deaths: data.results[0].total_deaths.toLocaleString(),
        globalTotal_new_cases_today: data.results[0].total_new_cases_today.toLocaleString(),
        globalTotal_new_deaths_today: data.results[0].total_new_deaths_today.toLocaleString(),
        globalTotal_unresolved: data.results[0].total_unresolved.toLocaleString(),


      });
      
    });
  }

  // getCountryNames(){
  //   let countries;
  //   let countryNames = [];
  //   let country;
  //   fetch('https://corona.lmao.ninja/countries')
  //   .then(r => r.json())
  //   .then(r => {
  //     countries = r;
  //     for(country of countries){
  //       countryNames.push(country.country);
  //     }
  //     this.setState( {
  //       countryNames: countryNames
  //      });
  //   });
  // }


  componentDidMount() {

    this.getCountryData( 'IN' );
    this.getAllData();
    // this.getCountryNames();

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
			<option key={i} value={this.state.countrieCodes[i]}>{item}</option>
		)
	}, this);
    
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Covid-19</h1>
          <h2> WordWide: <span style={{textTransform: "capitalize"}}>  </span> </h2>
          <div>
            <span style={spanStyle}> Total Cases: <b style={bStyle}>{this.state.globalTotal_cases}</b> </span>
            <span style={spanStyle}> Total Deaths: <b style={bStyle}>{this.state.globalTotal_deaths}</b> </span>
            <span style={{...spanStyle,paddingRight: 0}}>  Total Recovered: <b style={bStyle}>{this.state.globalTotal_recovered}</b> </span>
          </div>
          <h2> <span style={{textTransform: "capitalize"}}> {this.state.country}: </span> </h2>
          <div>
            <span style={spanStyle}> Total Cases: <b style={bStyle}>{ this.state.countryTotal_cases }</b> </span>
            <span style={spanStyle}> Total Active Cases: <b style={bStyle}>{ this.state.countryTotal_active_cases }</b> </span>
            <span style={spanStyle}> Total Serious Cases: <b style={bStyle}>{ this.state.countryTotal_serious_cases }</b> </span>
            <span style={spanStyle}> Total Cases Recovered : <b style={bStyle}>{ this.state.countryTotal_recovered }</b> </span>
            <span style={spanStyle}> Total Cases Unresolved : <b style={bStyle}>{ this.state.countryTotal_unresolved }</b> </span>
            <span style={spanStyle}> Total Deaths : <b style={bStyle}>{ this.state.countryTotal_deaths }</b> </span>
            <span style={spanStyle}> Cases Today : <b style={bStyle}>{ this.state.CountryTodayCases }</b> </span>
            <span style={spanStyle}> Deaths Today : <b style={bStyle}>{ this.state.CountryTodayDeaths }</b> </span>
          </div>

          <select style={ selectStyle } onChange={(event) => this.getCountryData(event.target)}>
            <option value="IN">India</option>
            { countriesList }
          </select>
          
        </header>
      </div>
    );
  }


}
export default App;
