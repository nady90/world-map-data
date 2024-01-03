"use client";
import countries from "../../data/countries.json";
import populationData from "country-json/src/country-by-population.json";
import { GeoJSON } from "react-leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mapData = countries as {
  type: string;
  features: { type: string; properties: {} }[];
};

type Props = {};

export default function Map({}: Props) {
  const countryStyles = {
    fillColor: "red",
    weight: 2,
  };

  return (
    <div>
      <h1 className="text-center capitalize text-lg">world map</h1>
      <MapContainer
        className="border-2 border-gray-500"
        style={{ height: "80vh", width: "100%" }}
        zoom={2}
        center={[20, 100]}
      >
        <GeoJSON
          style={countryStyles}
          data={mapData.features as { type: string; properties: {} }[]}
          onEachFeature={(feature, layer) => {
            const countryName = feature.properties.ADMIN;
            const population =
              populationData
                .find((elm) =>
                  elm.country.toLowerCase().includes(countryName.toLowerCase())
                )
                ?.population.toLocaleString("en-US")
                .toString() || "12";

            layer.bindPopup(
              `<h1>${countryName} - Population: </h1><p>${population}</p>`
            );
            layer.on({
              click: (event) => {
                if (event.target.options.fillColor === "blue") {
                  event.target.setStyle({
                    fillColor: "red",
                  });
                } else {
                  event.target.setStyle({
                    fillColor: "blue",
                  });
                }
              },
              mouseover: (event) => {
                event.target.setStyle({
                  color: "green",
                });
              },
              mouseout: (event) => {
                event.target.setStyle({
                  color: "#3388ff",
                });
              },
            });
          }}
        />
      </MapContainer>
    </div>
  );
}
