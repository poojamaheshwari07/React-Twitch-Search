import http from "../services/twitch-http-common";
import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Search from "./Search";
import Pagination from "./Pagination";

const Listing = () => {
  const [streamData, setStreamData] = useState([]);
  const [cursor, setCursor] = useState("");

  const [searchData, setSearchData] = useState("");
  const [backPageClick, setBackPageClick] = useState(0);
  const [forwardPageClick, setForwardPageClick] = useState(0);
  const [loading, setLoading] = useState(false);

  const [backPageExists, setBackPageExists] = useState(false); //make true if using https://api.twitch.tv/helix/streams
  const [forwardPageExists, setForwardPageExists] = useState(false); //make true if using https://api.twitch.tv/helix/streams as we can load without query

  useEffect(() => {
    const fetchRecords = () => {
      if (searchData !== "") {
        const options = {
          headers: {
            "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        };
        let streamEndPoint =
          "search/channels?live_only=true&query=" + searchData;

        if (backPageClick) {
          streamEndPoint += "&before=" + cursor;
        }
        if (forwardPageClick) {
          streamEndPoint += "&after=" + cursor;
        }
        setLoading(true);

        http.twitchListEndpoint
          .get(streamEndPoint, options)
          .then((response) => {
            setLoading(false);
            setStreamData(response["data"]["data"]);
            if (
              response["data"]["pagination"] &&
              response["data"]["pagination"]["cursor"]
            ) {
              setCursor(response["data"]["pagination"]["cursor"]);
              // setBackPageExists(true); //works with https://api.twitch.tv/helix/streams
              setForwardPageExists(true);
            } else if (backPageClick) {
              //if back page was clicked and no more back page exist
              setBackPageExists(false);
            } else if (forwardPageClick) {
              //if next page was clicked and no more forward page exist
              setForwardPageExists(false);
            }
          })
          .catch((e) => {
            setLoading(false);
            noRecordExist();
            console.log(e);
          });
      }
    };
    const fetchToken = async () => {
      const tokenResponse = await http.twitchGetToken.post("");
      const tokenJson = await tokenResponse.data;
      if (tokenJson["access_token"]) {
        localStorage.setItem("access_token", tokenJson.access_token);
        fetchRecords();
      }
    };
    if (localStorage.getItem("access_token")) {
      //if token is generated then fetch stream
      fetchRecords();
    } else {
      //generate access token with client id and client secret key
      fetchToken();
    }
  }, [searchData, backPageClick, forwardPageClick]);

  const noRecordExist = () => {
    setStreamData([]);
    setCursor("");
    setBackPageExists(false);
    setForwardPageExists(false);
  };

  const fetchRecordsWithSearch = (events) => {
    if (events !== searchData) {//when new search is made, reset to first page
      setForwardPageClick(0);
    }
    setSearchData(events);
    if (!events) noRecordExist();
  };
  const onBackPageClick = (events) => {
    //works only with https://api.twitch.tv/helix/streams as channel API doesn't provide to go back
    setBackPageClick(backPageClick + 1);
    setForwardPageClick(0);
  };
  const onForwardPageClick = (events) => {
    setForwardPageClick(forwardPageClick + 1);
    setBackPageClick(0);
  };

  return (
    <div className="container  p-3 my-3 border">
      <Search onSearch={fetchRecordsWithSearch}></Search>
      {loading && (
        <>
          <div data-testid="loading-div" className="d-flex justify-content-center">
            <div className="spinner-border" role="status"></div>
          </div>
        </>
      )}
      {!loading && (
        <>
          <Pagination
            prevPageExist={backPageExists}
            nextPageExist={forwardPageExists}
            onBackClick={onBackPageClick}
            onForwardClick={onForwardPageClick}
          ></Pagination>
        </>
      )}
      {!loading && streamData.length
        ? streamData.map((list) => (
            <ListItem
              key={list.id}
              id={list.id}
              display_name={list.display_name}
              thumbnail_url={list.thumbnail_url
                .replace("{width}", "150") // Acc. to https://dev.twitch.tv/docs/api/reference#search-channels, You can replace {width} and {height} with any values to get that size image
                .replace("{height}", "150")}
              title={list.title}
              game_name={list.game_name}
            />
          ))
        : !loading &&
          !streamData.length &&
          searchData !== "" &&
          "No Record Found!"}

      {searchData === "" && "Please try entering channel name!"}
    </div>
  );
};
export default Listing;
