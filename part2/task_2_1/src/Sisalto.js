import React, { Component } from 'react';
const Sisalto = (props) => {
  return (
    <div>
    {props.osat.map((osa)=><p key={osa.id}>{osa.nimi} (<b>{osa.tehtavia}</b>)</p>)}
    <p>Yhteensä: {props.osat.reduce((sum,osa)=>sum+osa.tehtavia,0)}</p>
    </div>
  )
}

export default Sisalto;
