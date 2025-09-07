import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Base_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      console.log("feed");
      const res = await axios.get(Base_URL + "feed", { withCredentials: true });
      console.log("res");
      dispatch(addFeed(res.data.users));
    } catch (err) {
      //
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center text-lg mt-8">No New Users Found</h1>
    );
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
