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
    <p>yhteensä {params.count} tehtävää</p>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={[osa1,osa2,osa3]} />
      <Yhteensa count={osa1.tehtavia+osa2.tehtavia+osa3.tehtavia} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
