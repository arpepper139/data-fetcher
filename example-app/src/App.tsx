import "./App.css";
import { useDataFetch } from "@libs/data-fetcher";

const API_URL = "https://countries.trevorblades.com";

const ALL_COUNTRIES_QUERY = `
 query GetAllCountries {
   countries {
     code
     name
   }
 }
`;

// const INVALID_QUERY = `
//   query Invalid {
//     asdfsdfsdf
//   }
// `

function App() {
  const { data, loading, error } = useDataFetch({
    url: API_URL,
    query: ALL_COUNTRIES_QUERY,
  });

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>{`Error: ${error.message}`}</>;
  }

  return <>{`Data: ${JSON.stringify(data)}`}</>;
}

export default App;
