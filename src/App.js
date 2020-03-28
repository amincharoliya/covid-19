import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountryNames from './data/country_names'
import CountryCodes from './data/country_codes'

import Loader from './components/loader/loader';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data : {
        'isLoading': true,
        'country': 'india',
        'CountryTodayCases': '',
        'CountryTodayDeaths': '',
        'countryTotal_cases': '',
        'countryTotal_active_cases': '',
        'countryTotal_serious_cases' : '',
        'countryTotal_recovered': '',
        'countryTotal_unresolved': '',
        'countryTotal_deaths': '',
        'globalTotal_cases': '',
        'globalTotal_active_cases': '',
        'globalTotal_serious_cases': '',
        'globalTotal_recovered': '',
        'globalTotal_unresolved': '',
        'globalTotal_deaths': '',
        'globalTotal_new_cases_today': '',
        'globalTotal_new_deaths_today': '',
        'globalTotal_unresolved': '',
        'countrynames': CountryNames,
        'countriecodes' : CountryCodes
      }
    };
  }

  getCountryData(a) {

    var APIdata = '';
    const {options, value, selectedIndex} = a;
    this.setState({
      isLoading: true
    });
    fetch( `https://thevirustracker.com/free-api?countryTotal=${value}` )
    .then( r => r.json())
    .then( r => {
      APIdata = r;

      this.setState( (prevState) => ({
        data: { ...prevState.data,
          "countryTotal_cases": APIdata['countrydata'][0].total_cases.toLocaleString(),
          "countryTotal_active_cases": APIdata['countrydata'][0].total_active_cases.toLocaleString(),
          "countryTotal_serious_cases": APIdata['countrydata'][0].total_serious_cases.toLocaleString(),
          "countryTotal_recovered": APIdata['countrydata'][0].total_recovered.toLocaleString(),
          "countryTotal_unresolved": APIdata['countrydata'][0].total_unresolved.toLocaleString(),
          "countryTotal_deaths": APIdata['countrydata'][0].total_deaths.toLocaleString(),
          "CountryTodayCases": APIdata['countrydata'][0].total_new_cases_today.toLocaleString(),
          "CountryTodayDeaths": APIdata['countrydata'][0].total_new_deaths_today.toLocaleString(),
          "country": options[selectedIndex].innerText
        },
        isLoading: false
      }));

    });
  }

  getCountryDataOnLoad(a) {

    this.setState({
      isLoading: true
    });
    var APIdata = '';
    fetch( `https://thevirustracker.com/free-api?countryTotal=${a}` )
    .then( r => r.json())
    .then( r => {
      APIdata = r;
      this.setState({
        data: { ...this.state.data,
          "countryTotal_cases": APIdata['countrydata'][0].total_cases.toLocaleString(),
          "countryTotal_active_cases": APIdata['countrydata'][0].total_active_cases.toLocaleString(),
          "countryTotal_serious_cases": APIdata['countrydata'][0].total_serious_cases.toLocaleString(),
          "countryTotal_recovered": APIdata['countrydata'][0].total_recovered.toLocaleString(),
          "countryTotal_unresolved": APIdata['countrydata'][0].total_unresolved.toLocaleString(),
          "countryTotal_deaths": APIdata['countrydata'][0].total_deaths.toLocaleString(),
          "CountryTodayCases": APIdata['countrydata'][0].total_new_cases_today.toLocaleString(),
          "CountryTodayDeaths": APIdata['countrydata'][0].total_new_deaths_today.toLocaleString(),
          "country": "India",
        },
        isLoading: false

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

  componentDidMount() {

    this.getCountryDataOnLoad('IN');
    this.getAllData();

  }
  

  render() {

    let countriesList = this.state.data["countrynames"].length > 0
		&& this.state.data["countrynames"].map((item, i) => {
		return (
			<option key={i} value={this.state.data["countriecodes"][i]}>{item}</option>
		)
	}, this);
    
    
    return (
      <div className="App bg-gray-800 text-gray-200 min-h-screen">
        <div id="header">
          <div class="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center bg-gray-800">
            <div class="w-full max-w-screen-xl relative mx-auto px-6">
              <div class="flex items-center -mx-6">
                <div class="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8">
                  <div class="flex items-center">
                    <a href="/" class="block mr-4">
                      <img className="h-10 w-auto md:block" src={logo} />
                    </a>
                    <h1 className="font-mono text-white font-semibold">Track Covid-19</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <section className="App-header w-full max-w-screen-xl relative mx-auto px-6" style={{minHeight: '100vh', alignContent: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

          <div className="data-wrap" style={{display: 'flex'}}>

            <div className="global-section mb-3">

              <h2 className="font-bold text-center mb-3 text-3xl">Global</h2>

              <table class="table-auto w-full text-center mb-4 text-xl">
                <thead>
                  <tr>
                    <th class="px-4 py-2 text-blue-500">Total Cases</th>
                    <th class="px-4 py-2 text-red-500">Total Deaths</th>
                    <th class="px-4 py-2 text-green-500">Total Recovered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border px-4 py-2 text-blue-500 font-semibold">{this.state.globalTotal_cases}</td>
                    <td class="border px-4 py-2 text-red-500 font-semibold">{this.state.globalTotal_deaths}</td>
                    <td class="border px-4 py-2 text-green-500 font-semibold">{this.state.globalTotal_recovered}</td>
                  </tr>
                </tbody>
              </table>

            </div>


            <div className="text-center country-section">
              <h2 className="text-xl font-bold text-center mb-4 text-2xl">{this.state.data["country"]}</h2>

              <table class="table-auto mb-4 text-left inline-block country-table text-lg">
                <tbody>
                  <tr>
                    <th class="px-4 py-2">Cases Today</th>
                    <td class="border px-4 py-2 text-center font-semibold">{ this.state.data["CountryTodayCases"] }</td>
                  </tr>
                  <tr>
                    <th class="px-4 py-2 text-red-600">Deaths Today</th>
                    <td class="border px-4 py-2  text-center text-red-600 font-semibold">{ this.state.data["CountryTodayDeaths"] }</td>
                  </tr>
                  <tr>
                  <th class="px-4 py-2 text-blue-700">Total Active Cases</th>
                    <td class="border px-4 py-2 text-center font-semibold text-blue-700">{ this.state.data["countryTotal_active_cases"] }</td>
                  </tr>
                </tbody>
              </table>

              <table class="table-auto mb-4 text-left inline-block country-table ">
                <tbody>
                  <tr>
                    <th class="px-4 py-2 text-blue-500">Total Cases</th>
                    <td class="border px-4 py-2 text-center text-blue-500 font-semibold">{ this.state.data["countryTotal_cases"] }</td>
                  </tr>
                  <tr>
                    <th class="px-4 py-2 text-red-500">Total Deaths</th>
                    <td class="border px-4 py-2  text-center text-red-500 font-semibold">{ this.state.data["countryTotal_deaths"] }</td>
                  </tr>
                  <tr>
                  <th class="px-4 py-2 text-green-500">Total Cases Recovered</th>
                    <td class="border px-4 py-2  text-center text-green-500 font-semibold">{ this.state.data["countryTotal_recovered"] }</td>
                  </tr>
                </tbody>
              </table>

            </div>

          </div>


          <div className="text-center color-black-300 mt-8 mb-8">
            <div class="relative w-2/4 inline-block">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(event) => this.getCountryData(event.target)}>
                <option value="IN">India</option>
                { countriesList }
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div>
              {this.state.isLoading ? <Loader /> : ''}
            </div>
          </div>

        </section>

        <footer className="footer z-100">
          <div className="m-h-16 px-4 py-4 max-w-screen-xl mx-auto">
            <p className="float-left">Developed by <a href="https://www.amincharoliya.com" className="text-blue-600">Amin Charoliya</a></p>
            <p className="float-right">Data used from <a className="text-blue-600" href="https://thevirustracker.com/" target="_blank">thevirustracker.com</a></p>
          </div>
      </footer>

      </div>

    );
  }


}
export default App;
