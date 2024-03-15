import { useEffect, useRef } from "react";

export const Pagination = ({ followersPerPage, totalFollowers, paginate }) => {
  const pageNumbers = [];

  const firstBtn = useRef(null);
  const lastBtn = useRef(null);

  for (let i = 1; i < Math.ceil(totalFollowers / followersPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <nav className="pagination">
      <ul>
        <li>
          <button onClick={() => paginate(1)} ref={firstBtn}>
            First
          </button>
        </li>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          );
        })}
        <li>
          <button onClick={() => paginate(pageNumbers.length)} ref={lastBtn}>
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};
