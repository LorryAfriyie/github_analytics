import { useEffect, useState } from "react";
import { Octokit } from "octokit";

export const Card = () => {
  const [gitFollowers, getGitFollowers] = useState([]);
  const [gitFollowing, getGitFollowing] = useState([]);

  const followers = () => {
    const octokit = new Octokit({
      auth: import.meta.env.VITE_TOKEN,
    });

    octokit
      .request("GET /user/followers", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((data) => {
        getGitFollowers(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const following = () => {
    const octokit = new Octokit({
      auth: import.meta.env.VITE_TOKEN,
    });

    octokit
      .request("GET /user/following", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((data) => {
        getGitFollowing(data.data);
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
      <div className="card-body">
        <ul>
          {gitFollowers.map((x, index) => {
            return (
              <li key={index}>
                <img src={x.avatar_url} alt="" />
                <p>{x.login}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};
