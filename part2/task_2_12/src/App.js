import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountries:[],
      searchField:'',
      countryToShow: null
    };
  }
  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        //debugger
        this.setState({allCountries:response.data})
      })
  }
  handleSearchFieldChange = (e) => {
    const countries = this.state.allCountries.filter((c)=>c.name.toLowerCase().includes(this.state.searchField.toLowerCase()))
    const countryToShow = countries.length==1 ? countries[0] : null
    this.setState({countryToShow,searchField: e.target.value})
  }
  handleCountryClick = (c) => {
    return ()=>{
      console.log(c)
      this.setState({countryToShow:c})
    }
  }

  render = () => {
    const countries = this.state.allCountries.filter((c)=>c.name.toLowerCase().includes(this.state.searchField.toLowerCase()))
    if (this.state.countryToShow) {
      const country=countries[0]
      return (
        <div>
        <input
          value={this.state.searchField}
          onChange={this.handleSearchFieldChange}
        />
        <h1>{country.name} </h1>
        <b>Capital:</b> {country.capital}<br/>
        <b>Population:</b> {country.population}<br/>
        <img src={country.flag} />
        </div>
      )
    }
    else if(countries.length>10){
      return (
        <div>
        <input
          value={this.state.searchField}
          onChange={this.handleSearchFieldChange}
        />
        too many matches ({countries.length})</div>
      )
    } else if (countries.length===0) {
      return (
        <div>
        <input
          value={this.state.searchField}
          onChange={this.handleSearchFieldChange}
        />
        no matches</div>
      )
    } else { // more than one matches
      return(
        <div>
          <input
            value={this.state.searchField}
            onChange={this.handleSearchFieldChange}
          />
          <ul>
            {countries.map((c)=><li onClick={this.handleCountryClick({c})} key={c.id}>{c.name}</li>)}
          </ul>
        </div>
      );
    }
  }
}

export default App;
