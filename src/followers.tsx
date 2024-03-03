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
    </section>
  );
};
