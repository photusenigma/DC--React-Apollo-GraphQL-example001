import React from 'react';
import gql from 'graphql-tag';
import { gqlLodash } from './utils';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
function MyComponent({data: {loading, allPeople}}) {
  if (loading) return (<div> Loading... </div>);
  console.log("peopleToFilms", allPeople.allPeople);
//   let people = Object.keys(allPeople);
  return (
    <div>
        <h1>This is a fake div...with a head, but no body!</h1>
        <dl>
            {allPeople.people.map(person => (
            <div key={person.name}>
                <dt><b>Character:</b> {person.name}</dt>
                <dt><b>Hare Color:</b> {person.hairColor}</dt>
                <dt><b>iColor:</b> {person.eyeColor}</dt>
                <dd>
                <b>films:</b><br/>
                {/* {person.film => (
                    <div> {film} </div>
                ))} */}
                </dd>
            </div>
            ))}
        </dl>
    </div>
  );
}

const query = gql`
    query {
        allPeople {
            people {
            name
            hairColor
            eyeColor
            mass
            filmConnection {
                films {
                title
                releaseDate
                openingCrawl
                }
            }
            starshipConnection {
                starships {
                name
                passengers
                starshipClass
                maxAtmospheringSpeed
                }
            }
            }
        }
    }
`;

// const query = gql`
//   query {
//     peopleToFilms: allPeople @_(get: "people") {
//       people @_(
//         keyBy: "name"
//         mapValues: "filmConnection.films"
//       ) {
//         name
//         hairColor
//         eyeColor
//         filmConnection {
//           films @_(map: "title") {
//             title
//           }
//         }
//       }
//     }
//   }
// `;


export default gqlLodash(query)(MyComponent);