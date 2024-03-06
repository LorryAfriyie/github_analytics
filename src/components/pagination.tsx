export const Pagination = ({ followersPerPage, totalFollowers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalFollowers / followersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <a href="!#" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
