import { Octokit } from "octokit";
import { useState, useEffect } from "react";
import { Pagination } from "./components/pagination";

export const Following = () => {
  const [following, getFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [followingPerPage] = useState(5);

  useEffect(() => {
    const GitHubFollowing = () => {
      setLoading(true);

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
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    };

    GitHubFollowing();
  }, []);

  const indexOfLastFollowing = currentPage * followingPerPage;
  const indexOfFirstFollowing = indexOfLastFollowing - followingPerPage;
  const currentFollowing = following.slice(
    indexOfFirstFollowing,
    indexOfLastFollowing,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className="loading">
        <p>Loading following...</p>
      </div>
    );

  if (!loading && following.length === 0) {
    return <p>Could not load users you are following</p>;
  }

  return (
    <section className="following">
      <div className="card">
        <div className="card-header">
          <h2>Following</h2>
        </div>

        <div className="card-body">
          <p>Number of people following: {following.length}</p>

          <ul>
            {currentFollowing.map((x, index) => {
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
            followersPerPage={followingPerPage}
            totalFollowers={following.length}
            paginate={paginate}
          />
        </div>
      </div>
    </section>
  );
};
