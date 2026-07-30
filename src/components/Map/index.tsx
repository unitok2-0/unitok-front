import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from 'constants/values';
import { memo, useEffect, useState } from 'react';
import * as S from './styles';

export interface MapPageProps {
  currentLocation: {
    lat: number,
    lng: number,
  }
}

const MapPage = ({ currentLocation }: MapPageProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  return (
    <S.MapContainer>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '20px' }}
          center={currentLocation}
          zoom={15}
          options={{
            disableDefaultUI: true,
          }}
        >
          <Marker
            position={currentLocation}
            icon={{
              url: '/assets/icon-pet-map.jpg'
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </S.MapContainer>
  );
};

export default memo(MapPage);