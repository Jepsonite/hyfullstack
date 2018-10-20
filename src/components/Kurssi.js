import React from 'react'

const Otsikko = (props) => {
  return (
    <h1>
      Opetusohjelma
    </h1>
  )
}

const Yhteensa = (props) => {
  return (
    <p>yhteensä {props.lukumaara} tehtävää</p>
  )
}

const Pilkottu = ({ osat }) => {
  console.log('pilkotussa osat on', osat);
  return (
    <div>
      {osat.map(osa => <Testi key={osa.id} osat={osa.osat} nimi={osa.nimi} />)}
    </div>
  )
}

const Testi = (props) => {
  console.log('testissä props on ', props);
  const tehtaviaYhteensa = (osat) => {
    let alkuarvo = 0;
    let summa = osat.reduce(
      (accumulator, currentValue) => accumulator + currentValue.tehtavia
      , alkuarvo
    );
    console.log('ennen palautusta summa on ', summa);
    return summa;
  }

  const tehtavat = tehtaviaYhteensa(props.osat);
  return (
    <div>
      <h1>{props.nimi}</h1>
      {props.osat.map(osa => <Yksittainen key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
      <Yhteensa lukumaara={tehtavat} />
    </div>
  )
}

const Yksittainen = (props) => {
  console.log('yksittaisessä propsit on', props);
  //mahdollisesti tarpeen vetää vielä yksityiskohtaisemmaksi
  return (
    <p>{props.nimi} {props.tehtavia}</p>
  )
}

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko name={props.kurssi.nimi} />
      {props.kurssi.osat.forEach((tsup) =>
        console.log(tsup)
      )}
      <Pilkottu osat={props.kurssi.osat} />
    </div>
  )
}

export default Kurssi