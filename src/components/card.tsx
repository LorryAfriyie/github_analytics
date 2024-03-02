import { useEffect, useState } from "react";

export const Card = () => {
  const [gitFollowers, getGitFollowers] = useState([]);
  const [gitFollowing, getGitFollowing] = useState([]);

  const followers = () => {
    fetch(
      `https://api.github.com/users/${import.meta.env.VITE_USERNAME}/followers`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getGitFollowers(data);
        console.log("Followers");
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const following = () => {
    fetch(
      `https://api.github.com/users/${import.meta.env.VITE_USERNAME}/following`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getGitFollowing(data);
        console.log("Following");
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    followers();
  }, []);

  return (
    <div className="card">
      <div className="card-header"></div>
      <div className="card-body">{import.meta.env.VITE_GREETING}</div>
      <div className="card-footer"></div>
    </div>
  );
};
