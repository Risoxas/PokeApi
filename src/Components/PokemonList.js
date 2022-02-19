import React, { useEffect, useState } from "react";
import "../styles/_list.scss";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import {
  CardGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
export default function PokemonList() {
  const [currentPage, setcurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState([]);

  const handlePage = (e) => {
    switch (e.target.id) {
      case "first":
        setcurrentPage(1);
        break;
      case "prev":
        setcurrentPage(currentPage - 1);
        break;
      case "next":
        setcurrentPage(currentPage + 1);
        break;
      case "last":
        setcurrentPage(totalPages);
        break;
      default:
        console.log(e.target.id);
        setcurrentPage(parseInt(e.target.id));
        break;
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (currentPage - 1) * 18
        }&limit=18`
      )
      .then((response) => {
        setData(response.data);

        if (response.data.count) {
          let pages = Math.ceil(response.data.count / 18);
          setTotalPages(pages);
          let arr = Array.from({ length: pages + 1 }, (_, i) => i);
          let start = currentPage >= pages - 4 ? pages - 4 : currentPage;
          setPagination(arr.slice(start, start + 5));
        }
      });
  }, [currentPage]);

  if (!data) return null;
  return (
    <>
      <CardGroup>
        {data.results.map((item) => (
          <PokemonCard key={item.id} pokemon={item} />
        ))}
      </CardGroup>
      <Pagination className="pagination">
        <PaginationItem key="first" disabled={currentPage === 1}>
          <PaginationLink id="first" href="#" onClick={handlePage}>
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem key="prev" disabled={currentPage === 1}>
          <PaginationLink onClick={handlePage} id="prev">
            Prev
          </PaginationLink>
        </PaginationItem>
        {pagination.map((item, idx) => (
          <PaginationItem key={currentPage + idx} active={currentPage === item}>
            <PaginationLink onClick={handlePage} id={item}>
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink id="next" href="#" onClick={handlePage}>
            Next
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink id="last" href="#" onClick={handlePage}>
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </>
  );
}
