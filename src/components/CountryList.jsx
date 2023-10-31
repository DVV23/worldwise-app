import styles from "./CountryList.module.css";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add you first country by clicking on a country on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  //  arr = acc form reduce method, if there is no country in arr that is in city arr =
  // we return ...arr + new object, else if we return just an arr. [] - start point for reduce method.
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
