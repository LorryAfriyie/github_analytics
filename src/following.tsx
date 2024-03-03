import { Octokit } from "octokit";
import { useState, useEffect } from "react";

export const Following = () => {
  const [following, getFollowing] = useState([]);

  const GitHubFollowing = () => {
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
        getFollowing(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    GitHubFollowing();
  }, []);

  return (
    <section className="following">
      <h2>Following</h2>
    </section>
  );
};
