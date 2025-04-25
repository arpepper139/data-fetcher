import { useState, useEffect } from "react";

interface UseDataFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchDataInput {
  url: string;
  query: string;
}

// TO DO -- add options and variables
// interface UseFetchDataOptions {
//   variables: Record<string, unknown>
// }

const fetchGraphQL = async (url: string, query: string) => {
  const req = await fetch(url, {
    body: JSON.stringify({ query }),
    method: "POST",
    headers: {
      Accept: "application/json, multipart/mixed",
      "content-type": "application/json",
    },
  });
  return req.json();
};

export function useDataFetch<T>({
  url,
  query,
}: UseFetchDataInput): UseDataFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchGraphQL(url, query);

      if (response.errors) {
        // @ts-ignore -- would add types to the response to fix
        throw new Error(response.errors.map((error) => error.message).join());
      }

      setData(response);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, query]);

  return { data, loading, error };
}

/// API Design Next Goals
// - support variables
// - refetch
// - skip
// - support all types of fetching requests -- create a useDataMutation hook
// - caching
// - normalization of the cache (might not be doable here without access to schema information)
