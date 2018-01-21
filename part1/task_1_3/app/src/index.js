import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (params) => {
  return (
    <h1>{params.kurssi}</h1>
  )
}
const Sisalto = (params) => {

  return (<div>
    <Osa osa={params.osat[0].nimi} tehtavia={params.osat[0].tehtavia} />
    <Osa osa={params.osat[1].nimi} tehtavia={params.osat[0].tehtavia} />
    <Osa osa={params.osat[2].nimi} tehtavia={params.osat[0].tehtavia} />
  </div>)
}
const Osa = (params) => {
  return (<p>{params.osa} {params.tehtavia}</p>);
}
const Yhteensa = (params) => {
  return (
    <p>yhteensä {params.osat[0].tehtavia+params.osat[1].tehtavia+params.osat[2].tehtavia} tehtävää</p>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
