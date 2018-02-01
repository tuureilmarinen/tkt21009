import React, { Component } from 'react';
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
const Kurssi = (props) => {
  return (
    <div>
      <Otsikko otsikko={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat} />
    </div>
  )
}

export default Kurssi;
