import { Octokit } from "octokit";
import { useEffect, useState } from "react";

export const Followers = () => {
  const [followers, getFollowers] = useState([]);

  const GitHubFollowers = () => {
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
        getFollowers(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    GitHubFollowers();
  }, []);

  return (
    <section className="followers">
      <h2>Followers</h2>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <ul>
            {followers.map((x, index) => {
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
    </section>
  );
};
