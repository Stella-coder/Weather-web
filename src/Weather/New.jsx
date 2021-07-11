import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../images/cloud2.jpg";
import img2 from "../images/light.gif";
import img3 from "../images/sun.jpg";
import Input from "antd";
import axios from "axios";

const api = {
  key: "93f3a446f163b38ed5e22ed61f44f5ed",
  base: "https://api.openweathermap.org/data/2.5/",
};

const New = () => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [fetch, setFetch] = useState("");

  const getData = async () => {
    const res = await axios(
      `${api.base}weather?q=${search}&units=metric&appid=${api.key}`
    );
    setFetch(res.data);
    console.log(res.data);
  };
  const DateBuild = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}.`;
    useEffect(() => {
      getData();
    }, []);
  };
  return fetch ? (
    <Container>
   {
     (Math.round(fetch.main.temp) < -1)?
       <BackgroundImage src ={img3}/>:
       (Math.round(fetch.main.temp) < 25)?
       <BackgroundImage src ={img2}/>:
       <BackgroundImage src ={img}/>
     
   }
     
      <Wrapper>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={getData}
        />
        <Date1>{DateBuild(new Date())}</Date1>
        <Location>
          {fetch.name}, {fetch.sys.country}
        </Location>
        <Temp>{Math.round(fetch.main.temp)}°C</Temp>
        <Description>{fetch.weather[0].description}</Description>
        <Name>Welcome {name}</Name>
      </Wrapper>
    </Container>
  ) : (
    <Container>
      <BackgroundImage src={img} />
      <Wrapper>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={getData}
        />
        <Date1>{DateBuild(new Date())}</Date1>
        <Location>Location</Location>
        <Temp>0°C</Temp>
        <Description>Description</Description>
        <Name>Welcome {name}</Name>
      </Wrapper>
    </Container>
  );
};

export default New;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  color: white;
`;
const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 500px;
    height: 50px;
    border-radius: 30px;
    background-color: lightblue;
    margin: 10px;
    padding-left: 10px;
    border: none;
  }
`;
const Date1 = styled.div`
  font-size: 20px;

  margin-top: 20px;
`;
const Location = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
`;
const Temp = styled.div`
  height: 200px;
  margin-top: 20px;
  width: 400px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 50px;
`;
const Description = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
`;
const Name = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
`;
