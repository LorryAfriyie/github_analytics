export const Pagination = ({ followersPerPage, totalFollowers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalFollowers / followersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      <ul>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
