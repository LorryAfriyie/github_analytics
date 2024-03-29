import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { Pagination } from "./components/pagination";

export const Followers = () => {
  const [followers, getFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [followersPerPage] = useState(5);

  useEffect(() => {
    const GitHubFollowers = () => {
      const octokit = new Octokit({
        auth: import.meta.env.VITE_TOKEN,
      });
      setLoading(true);
      octokit
        .request("GET /user/followers", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
        .then((data) => {
          setLoading(false);
          getFollowers(data.data);
          console.log(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    };

    GitHubFollowers();
  }, []);

  // Get current followers
  const indexOfLastFollower = currentPage * followersPerPage;
  const indexOfFirstFollower = indexOfLastFollower - followersPerPage;
  const currentFollowers = followers.slice(
    indexOfFirstFollower,
    indexOfLastFollower,
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Show loading if the data is not reading to be displayed
  if (loading)
    return (
      <div className="loading">
        <p>Loading followers...</p>
      </div>
    );

  if (!loading && currentFollowers.length === 0) {
    return <p>Could not load GitHub followers</p>;
  }

  return (
    <section className="followers">
      <div className="card">
        <div className="card-header">
          <h2>Followers</h2>
        </div>

        <div className="card-body">
          <p>Number of followers: {followers.length}</p>

          <ul>
            {currentFollowers.map((x, index) => {
              return (
                <li key={index}>
                  <img src={x.avatar_url} alt={x.avatar_url} />

                  <span>{x.login}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card-footer">
          <Pagination
            followersPerPage={followersPerPage}
            totalFollowers={followers.length}
            paginate={paginate}
          />
        </div>
      </div>
    </section>
  );
};
