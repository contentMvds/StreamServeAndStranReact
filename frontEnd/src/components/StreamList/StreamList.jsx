import React from "react";

export const Streamlist = ({ list }) => {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>Listagem do API</h1>
      <ul style={{}}>
        {list.map((item, i) => {
          return <li style={{listStyle: 'none', padding: '0.5rem'}} key={i.toString()}> {item.message} </li>;
        })}
      </ul>
    </>
  );
};
