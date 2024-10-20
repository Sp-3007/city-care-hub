import React, { useState, useEffect, createRef } from 'react';
import Header from '../components/Cityvisit/Header/Header';
import List from '../components/Cityvisit/List/List';
import Map from '../components/Cityvisit/Map/Map';
import { fetchPlaces } from '../components/Cityvisit/Api';

const PlanCityVisit = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('restaurants');
  const [selectedRating, setSelectedRating] = useState('all');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [childClicked, setChildClicked] = useState(null);
  const [elRefs, setElRefs] = useState([]);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 }); 

  // Request location permission
  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
          setLocationPermission('granted');
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationPermission('denied');
          } else {
            setLocationPermission('error');
          }
        }
      );
    } else {
      setLocationPermission('unsupported');
    }
  };

  // Fetch places based on map bounds and selected category
  useEffect(() => {
    const fetchData = async () => {
      if (mapBounds) {
        setLoading(true);
        try {
          const response = await fetchPlaces(mapBounds, selectedCategory);
          setPlaces(response);
        } catch (error) {
          console.error('Error fetching places:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [mapBounds, selectedCategory,coords]);

  // Create references for scrolling
  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  // Filter places based on selected rating
  const filterPlacesByRating = (places) => {
    if (selectedRating === 'all') return places;
    return places.filter((place) => place.rating >= parseFloat(selectedRating));
  };

  const filteredPlaces = filterPlacesByRating(places); // Apply filtering here

  return (
    <div className="bg-black bg-opacity-50">
      <Header setCoords={setCoords}/>
      <div className="flex">
        <List
          onRequestLocationPermission={requestLocationPermission}
          locationPermission={locationPermission}
          places={filteredPlaces} // Pass the filtered places
          setSelectedCategory={setSelectedCategory}
          setSelectedRating={setSelectedRating}
          loading={loading}
          elRefs={elRefs}
          childClicked={childClicked}
        />
        <Map
          currentPosition={currentPosition}
          locationPermission={locationPermission}
          setMapBounds={setMapBounds}
          places={filteredPlaces} // Also pass the filtered places to the map
          setChildClicked={setChildClicked}
          coords={coords}
        />
      </div>
    </div>
  );
};

export default PlanCityVisit;
