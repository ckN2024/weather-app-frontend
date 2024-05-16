import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import weather from "../apiResonsses/weather.json";
import fivedayforecast from "../apiResonsses/fivedayforecast.json";
import { ImLocation } from "react-icons/im";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Oval } from "react-loader-spinner";

const Home = ({ email, currentCity, setCurrentCity }) => {
  const [data, setData] = useState({});
  const [fiveDaysData, setFiveDaysData] = useState({});
  const [isValidCity, setIsValidCity] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [fiveDaysDataLoading, setFiveDaysDataLoading] = useState(true);

  const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL
  const USER_BASE_URL = import.meta.env.VITE_USER_BASE_URL

  // whenever a city is searched isCityInFavourites will get updated accordingly
  const [isCityInFavourites, setIsCityInFavourites] = useState(false);
  const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

  const access_token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    setDataLoading(true);
    setFiveDaysDataLoading(true);
    if (!currentCity) {
      setCurrentCity("delhi");
    }
    async function getWeather() {
      try {
        const currentWeather = await axios.get(
          `${WEATHER_BASE_URL}/api/weather/current`,
          {
            headers: {
              city: currentCity,
            },
          }
        );

        setData(currentWeather.data.data);
        setDataLoading(false);

        const fiveDaysWeather = await axios.get(
          `${WEATHER_BASE_URL}/api/weather/fivedays`,
          {
            headers: {
              city: currentCity,
            },
          }
        );
        setFiveDaysData(fiveDaysWeather.data.data);
        setFiveDaysDataLoading(false);

        // check if the city is in favourites
        if(access_token) {
          try {
            const favouriteCitiesResponse = await axios.get(
              `${WEATHER_BASE_URL}/api/weather/getfavouritecities`,
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );
            const favouriteCitiesRecord = favouriteCitiesResponse.data.data;
  
            const favouriteCities = favouriteCitiesRecord.map(
              (record) => record.favourite
            );
  
            if (favouriteCities.includes(currentCity)) {
              setIsCityInFavourites(true);
            } else {
              setIsCityInFavourites(false);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        setIsValidCity(false)
        console.log(error);
      }
    }

    getWeather();

    // setData(weather);
    // setFiveDaysData(fivedayforecast);
  }, [currentCity, isCityInFavourites]);

  const favouriteButtonHandler = async () => {
    console.log("favourite button clicked")
    if (isCityInFavourites) {
      // remove from favourites
      if (isValidCity) {
        await axios.delete(
          `${WEATHER_BASE_URL}/api/weather/removefromfavourites`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              city: currentCity,
            },
          }
        );

        // check if the city is in favourites
        try {
          const favouriteCitiesResponse = await axios.get(
            `${WEATHER_BASE_URL}/api/weather/getfavouritecities`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          const favouriteCitiesRecord = favouriteCitiesResponse.data.data;

          const favouriteCities = favouriteCitiesRecord.map(
            (record) => record.favourite
          );

          if (favouriteCities.includes(currentCity)) {
            setIsCityInFavourites(true);
          } else {
            setIsCityInFavourites(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // add to favourite
      if (isValidCity && access_token) {
        await axios.post(`${WEATHER_BASE_URL}/api/weather/addtofavourites`, null, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            city: currentCity,
          },
        });

        // check if the city is in favourites
        try {
          const favouriteCitiesResponse = await axios.get(
            `${WEATHER_BASE_URL}/api/weather/getfavouritecities`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          const favouriteCitiesRecord = favouriteCitiesResponse.data.data;

          const favouriteCities = favouriteCitiesRecord.map(
            (record) => record.favourite
          );

          console.log(favouriteCities)

          if (favouriteCities.includes(currentCity)) {
            setIsCityInFavourites(true);
          } else {
            setIsCityInFavourites(false);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Log in to add a city to favourites")
      }
    }
  };

  return (
    <div>
      <Header
        email={email}
        currentCity={currentCity}
        setCurrentCity={setCurrentCity}
      />
      <div className="flex flex-col flex-wrap space-between gap-3 border rounded text-slate-700 bg-gradient-to-br from-indigo-200 from-10% via-sky-100 via-30% to-indigo-300 to-90% h-[75vh] mx-[6em] my-[2em] p-[3em] relative">
        {/* favourite button */}
        <div
          onClick={favouriteButtonHandler}
          className="absolute top-[1.5em] right-[1.5em]"
        >
          {isCityInFavourites ? (
            <GoHeartFill
              className="text-[2.5em] text-red-400"
              title="remove from favourites"
            />
          ) : (
            <GoHeart
              className="text-[2.5em] text-red-400"
              title="mark favourite"
            />
          )}
        </div>

        {dataLoading || fiveDaysDataLoading ? (
          <div className="w-full h-full flex justify-center items-cneter">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <>
            <div className="bg-blue-200 w-[20em] p-[2em] rounded-md">
              {/* city name */}
              <div className="flex gap-1 items-center text-[2em] font-semibold">
                <ImLocation className="" />
                <p className="">{data?.name}</p>
              </div>

              {/* temperature details */}
              <div>
                {/* temperature */}
                <div className="flex items-center text-[2em]">
                  {/* temperature */}
                  <FaTemperatureHalf className="text-[0.7em]" />
                  <p>{data?.main?.temp} K</p>
                </div>

                {/* Real feel */}
                <div className="text-[1em]">
                  <p>Real feel: {data?.main?.feels_like} K</p>
                </div>

                {/* max and min */}
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <FaArrowUp className="text-[1.2em]" />
                    <p>max: {data?.main?.temp_max}</p>
                  </div>

                  <div className="flex items-center">
                    <FaArrowDown className="text-[1.2em]" />
                    <p>min: {data?.main?.temp_min}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* more details */}
            <div className="bg-blue-200 w-[20em] p-[2em] rounded-md">
              <div className="">
                <div className="flex items-center">
                  <WiHumidity className="text-[1.8em]" />
                  Humidity: {data?.main?.humidity} %
                </div>

                <div className="flex items-center">
                  <WiHumidity className="text-[1.8em]" />
                  Atm pressure: {data?.main?.pressure} hPa
                </div>

                <div className="flex items-center">
                  <WiHumidity className="text-[1.8em]" />
                  Visibility: {data?.visibility} m
                </div>

                <div className="flex items-center">
                  <WiHumidity className="text-[1.8em]" />
                  Cloudiness: {data?.clouds?.all} %
                </div>
              </div>
            </div>

            {/* Rain and snow */}
            <div className="bg-blue-200 w-[20em] p-[1em] rounded-md">
              <div className="flex items-center">
                <WiHumidity className="text-[1.8em]" />
                Rain volume (last 1h): {data?.rain?.["1h"]}{" "}
                {data?.rain?.["1h"] ? "mm" : "--"}
              </div>

              <div className="flex items-center">
                <WiHumidity className="text-[1.8em]" />
                Rain volume (last 3h): {data?.rain?.["3h"]}{" "}
                {data?.rain?.["3h"] ? "mm" : "--"}
              </div>
            </div>

            {/* Wind */}
            <div className="bg-blue-200 w-[20em] p-[1em] rounded-md">
              <div className="flex items-center">
                <WiHumidity className="text-[1.8em]" />
                Wind speed: {data?.wind?.speed}{" "}
                {data?.wind?.speed ? "m/s" : "--"}
              </div>

              <div className="flex items-center">
                <WiHumidity className="text-[1.8em]" />
                Wind direction: {data?.wind?.deg}{" "}
                {data?.wind?.deg ? "deg" : "--"}
              </div>
            </div>

            {/* favourite cities */}
            {/* <div className="flex flex-wrap gap-2 justify-center bg-blue-200 w-[20em] p-[1em] rounded-md">
          <div className="bg-blue-300 p-1 w-[48%]">city1</div>
          <div className="bg-blue-300 p-1 w-[48%]">city2</div>
          <div className="bg-blue-300 p-1 w-[48%]">city3</div>
          <div className="bg-blue-300 p-1 w-[48%]">city4</div>
          <div className="bg-blue-300 p-1 w-[48%]">city5</div>
        </div> */}

            {/* 5 days forecast */}
            <div className="bg-blue-200 flex flex-wrap justify-center gap-2 w-[30em] h-full p-[1em] rounded-md">
              <h3 className="font-semibold text-xl w-full">5 days forecast:</h3>
              {fiveDaysData?.list?.map((d, idx) => (
                <div
                  className="bg-indigo-100 px-3 py-2 w-[47%] rounded-md"
                  key={idx}
                >
                  <p className="underline">Day {idx + 1}: </p>
                  <p>Temp: {d?.main?.temp}</p>
                  <p>Max: {d?.main?.temp_max}</p>
                  <p>Min: {d?.main?.temp_min}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
