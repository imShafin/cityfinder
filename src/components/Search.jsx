import React, { useState } from 'react';
import { DATA, CountryCode } from '../const';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [, setSearchResult] = useState('');

    const geoUrl = DATA.geoURL;

    // useEffect(() => {
        
    // }, [])


    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setSearchResult('');
            onSearch(searchTerm.trim());
            return;
        }
        const searchQuery = CountryCode[searchTerm.toUpperCase()] || searchTerm;
        console.log(searchQuery);
        fetch(geoUrl)
            .then(res => res.json())
            .then(data => {
                const countries = data.objects.countries.geometries;
                //console.log(countries);
                const foundCountry = countries.find(geo => {
                    const countryName = (geo.properties?.name || '').toLowerCase();
                    const searchLower = searchQuery.toLowerCase();
                    
                    return (
                        countryName.includes(searchLower)
                    );
                });
                if (foundCountry) {
                    const result = {
                        name: foundCountry.properties?.name,
                    };
                    //setSearchResult(result);
                    setSearchResult(result.name);
                    onSearch(result.name);  // Pass only the ID of the single country
                } else {
                    //setSearchResult(null);
                    setSearchResult(null)
                    onSearch(null);
                }
            })
            .catch(error => {
                console.error("Error fetching country data:", error);
                setSearchTerm('');
                onSearch('');
            });
    };

    return (
        <div className="card p-3">
            <div className="mb-3">
                <h4>Country Search</h4>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                        className="btn btn-primary" 
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                
                {/* {searchResult && (
                    <div>
                        <h5>Results:</h5>
                        {searchResult}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Search;