import axios from "axios"
import { useEffect, useState } from "react"
import Country from "./components/country"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [countriesWithQuery, setCountriesWithQuery] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data.map(c => {
          return c
        }))
      })
  }, [])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
    if (e.target.value) {
      let newCountries = countries.filter((c) => {
        if (c.name.common
          .toLowerCase()
          .includes(e.target.value.toLowerCase())) {
          c.toShow = true;
          return c
          }
      })
      setCountriesWithQuery(newCountries.length > 0 ? newCountries : null)
    } else {
      setCountriesWithQuery(null)
    }
  }

  if (!countries) {
    return null
  }

  return (
    <div>
      <div>
        find countries
        <input value={query} onChange={handleQueryChange} />
      </div>
      <div>
        {countriesWithQuery
          ? countriesWithQuery.length > 10
            ? <div>Too many matches, specify another filter</div>
            : countriesWithQuery.length > 1
              ? countriesWithQuery.map((c, i) => {
                c.toShow = false
                return <Country
                  key={i}
                  countryData={c}
                />
              })
              : 
                <Country
                  countryData={countriesWithQuery[0]}
                />
          : null}
      </div>
    </div>
  );
}

export default App