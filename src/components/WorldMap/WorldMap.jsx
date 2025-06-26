import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Search from "../Search";
import { DATA, CountryCode } from "../../const";
import Clock from '../Clock/Clock';
import CountryInfo from "../Details/details";


function WorldMap() {
  const [highlightedCountry, setHighlightedCountry] = useState("");

  const handleSearch = (searchTerm) => {
    setHighlightedCountry(searchTerm);
  };

  const geoUrl = DATA.geoURL;
  //console.log(highlightedCountry);

  return (
    <>
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-lg-6 col-12 ms-5 mb-4 mb-lg-0">
            <div className="pe-5 border border-5 border-secondary h-100">
              <ComposableMap className="w-100" style={{ height: "700px" }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(
                      (geo) => (
                        //console.log(geo.rsmKey),
                        (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={
                              highlightedCountry === geo.properties.name
                                ? "#FF5722"
                                : "#9fc5e8"
                            }
                            stroke="#000000"
                            strokeWidth={
                              highlightedCountry === geo.properties.name ? 1 : 0.5
                            }
                            style={{
                              hover: {
                                fill: highlightedCountry === geo.properties.name
                                  ? "#FF5722"
                                  : "#6fa8dc",
                                outline: "none",
                              },
                              pressed: {
                                fill: "#2d5985",
                                outline: "none",
                              },
                            }}
                          />
                        )
                      )
                    )
                  }
                </Geographies>
              </ComposableMap>
            </div>
          </div>

          {/* Search Column */}
          <div className="col-lg-5 col-12">
            <Search onSearch={handleSearch} />
            <CountryInfo country={highlightedCountry} />
          </div>
        </div>
      </div>

      <Clock onSearch={highlightedCountry} />

    </>
  );
}

export default WorldMap;
