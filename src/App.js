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

    //this.getCountryDataOnLoad('IN');
    //this.getAllData();
	window.location.href = "https://www.worldometers.info/coronavirus/";

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


       <section class="App-header w-full max-w-screen-xl relative mx-auto px-6" style="min-height: 100vh; place-content: center; display: flex; flex-direction: column;">Data website is down, redirecting to <a href="https://www.worldometers.info/coronavirus/"> https://www.worldometers.info/coronavirus/ </a></section>

        

      </div>

    );
  }


}
export default App;
