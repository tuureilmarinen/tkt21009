import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (params) => {
  return (
    <h1>{params.kurssi}</h1>
  )
}
const Sisalto = (params) => {

  return (<div>
    <Osa osa={params.osat[0]} tehtavia={params.tehtavat[0]} />
    <Osa osa={params.osat[1]} tehtavia={params.tehtavat[1]} />
    <Osa osa={params.osat[2]} tehtavia={params.tehtavat[2]} />
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
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14
  /*const osa1 = {
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
  }*/

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={[osa1,osa2,osa3]} tehtavat={[tehtavia1,tehtavia2,tehtavia3]} />
      <Yhteensa count={tehtavia1+tehtavia2+tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
