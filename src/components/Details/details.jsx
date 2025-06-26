import React, { useState, useEffect } from "react";
import { fetchCountryInfo } from "../../api/groq_api";

function CountryInfo({ country }) {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const getInfo = async () => {
    setLoading(true);
    const result = await fetchCountryInfo(country);
    setInfo(result);
    setLoading(false);
  };

  useEffect(() => {
    setInfo("");     // Clear previous info
    setLoading(false); // Reset loading state
  }, [country]);



  return (
    <div style={{ marginTop: "1rem" }}>
      <button className="btn btn-primary" onClick={getInfo}>Get AI Info</button>
      {loading && <p>Loading info...</p>}
      {info && (
        <div style={{
          whiteSpace: "pre-wrap",
          marginTop: "1rem",
          height: "30rem",
          overflowY: "auto",
        }}>
          <h3>About {country}</h3>
          <p>{info}</p>s
        </div>
      )}
    </div>
  );
}

export default CountryInfo;
