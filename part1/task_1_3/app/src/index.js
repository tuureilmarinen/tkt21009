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
const Kurssi = (params) => {
  return (
    <div>
      <Otsikko kurssi={params.kurssi.nimi} />
      <Sisalto osat={params.kurssi.osat} />
      <Yhteensa osat={params.kurssi.osat}/>
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
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
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
