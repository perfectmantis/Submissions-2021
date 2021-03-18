import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    if (!response.ok) {
      return setError(true);
    } else {
      setError(false);
      setData(response.data);
    }
  };
  return {
    data,
    loading,
    error,
    request,
  };
};
