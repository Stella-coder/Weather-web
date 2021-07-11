import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const api = {
  key: "93f3a446f163b38ed5e22ed61f44f5ed",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Body = () => {
  const [searchBox, setSearchBox] = useState("");
  const [fetch, setFetch] = useState("");

  const [name, setName] = useState("");

  const showName = () => {
    setName(" ");
  };

  const SearchN = async () => {
    const res = await axios(
      `${api.base}weather?q=${searchBox}&units=metric&appid=${api.key}`
    );
    console.log(res.data);
    if (res) {
      return setFetch(res.data);
    }
    setSearchBox(" ");
  };
  const DateBuild = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    return `${day}, ${month} ${date} ${year}.`;
    useEffect(() => {
      SearchN();
    }, []);
  };
  return (
    <div>
      {fetch ? (
        <Container>
          <Search>
            <input
              onKeyPress={SearchN}
              value={searchBox}
              onChange={(e) => {
                setSearchBox(e.target.value);
              }}
              placeholder="Search"
            />
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyPress={showName}
            />
          </Search>

          <Text>
            <Text1>{DateBuild(new Date())}</Text1>
            <Text2>
              {fetch.name}, {fetch.sys.country}.
            </Text2>
          </Text>
          <Cel>{Math.round(fetch.main.temp)}°C</Cel>
          <Description>{fetch.weather[0].description}</Description>
        </Container>
      ) : (
        <Container>
          <Search>
            <input
              onKeyPress={SearchN}
              value={searchBox}
              onChange={(e) => {
                setSearchBox(e.target.value);
              }}
              placeholder="Search"
            />
          </Search>
          <Text>
            <Text1>{DateBuild(new Date())}</Text1>
            <Text2>default, null.</Text2>
          </Text>
          <Cel>0°C</Cel>
          <Description>null</Description>
          <Name>{name}</Name>
        </Container>
      )}
    </div>
  );
};

export default Body;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  justify-content: space-around;
  position: relative;

  &:before {
    content: "";
    background: url(images/cloud2.jpg) center center / cover fixed no-repeat;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }
`;
const Search = styled.div`
  display: flex;

  input {
    height: 50px;
    width: 500px;
    background-color: lightblue;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin: 30px;
    img {
      width: 30px;
    }
    span {
      font-size: 20px;
      color: white;
    }
  }
`;
const Text = styled.div`
  text-align: center;
`;
const Text1 = styled.div`
  font-size: 20px;
`;
const Text2 = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const Cel = styled.div`
  height: 300px;
  width: 500px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: bold;
`;
const Description = styled.div`
  font-size: 50px;
  font-weight: bold;
`;
const Name = styled.div``;
