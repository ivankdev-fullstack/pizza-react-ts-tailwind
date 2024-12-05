import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../services/apiGeocoding";

interface UserGeo {
  coords: {
    latitude: string;
    longitude: string;
  };
}

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = (await getPosition()) as UserGeo;
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}`;

  return { position, address };
});
