import React from 'react';
import gql from 'graphql-tag';
import { gqlLodash } from './utils';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
function MyComponent({data: {loading, peopleToFilms}}) {
  if (loading) return (<div> Loading... </div>);
  let people = Object.keys(peopleToFilms);
  return (
    <div>
        <h1>This is a fake div...with a head, but no body!</h1>
        <dl>
            {people.map(name => (
            <div key={name}>
                <dt><b>Character:</b> {name}</dt>
                <dt><b>Hare Color:</b> {name.blinkhairColor}</dt>
                <dt><b>iColor:</b> {name.eyeColor}</dt>
                <dd>
                <b>films:</b><br/>
                {peopleToFilms[name].map(film => (
                    <div> {film} </div>
                ))}
                </dd>
            </div>
            ))}
        </dl>
    </div>
  );
}

const query = gql`
  query {
    peopleToFilms: allPeople @_(get: "people") {
      people @_(
        keyBy: "name"
        mapValues: "filmConnection.films"
      ) {
        name
        hairColor
        eyeColor
        filmConnection {
          films @_(map: "title") {
            title
          }
        }
      }
    }
  }
`;

export default gqlLodash(query)(MyComponent);