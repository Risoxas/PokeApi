import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/_list.scss";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import {
  CardGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  Col,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

export default function PokemonList() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState([]);
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState(false);
  const [show, setShow] = useState(false);
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";

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
        setcurrentPage(parseInt(e.target.id));
        break;
    }
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}?offset=${(currentPage - 1) * 18}&limit=18`)
      .then((response) => {
        setData(response.data);

        if (response.data.count) {
          let pages = Math.ceil(response.data.count / 18);
          setTotalPages(pages);
          let arr = Array.from({ length: pages + 1 }, (_, i) => i);
          let start = currentPage >= pages - 4 ? pages - 4 : currentPage;
          setPagination(arr.slice(start, start + 5));
          setLoading(false);
        }
      });
  }, [currentPage]);

  const handleChange = (e) => {
    setShow(false);
    const { value } = e.target;
    if (!value) {
      setResult(false);
      setSearch(null);
    } else {
      setSearch({ name: value, url: `${baseUrl}/${value}` });
    }
  };
  const handleBack = (e) => {
    let input = document.getElementById("searchBox");
    input.value = "";
    setSearch(null);
    setResult(false);
  };
  const handleSearch = () => {
    if (search) {
      setResult(search);
    } else {
      setShow(true);
    }
  };

  if (loading) return null;

  return (
    <>
      <Form>
        <Col md={2}>
          <Label for="searchBox">Buscar</Label>
          <div className="d-flex">
            <Input
              type="text"
              id="searchBox"
              name="search"
              onSubmit={handleBack}
              onChange={handleChange}
            />
            <Button color="primary" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </div>
        </Col>
        {show ? (
          <Alert variant="danger" isOpen={show}>
            Please add a value in searchbox
          </Alert>
        ) : null}
      </Form>
      <CardGroup>
        {result ? (
          <PokemonCard pokemon={result} />
        ) : (
          data.results.map((item) => (
            <PokemonCard key={item.id} pokemon={item} />
          ))
        )}
      </CardGroup>
      {result ? (
        <Button color="primary" onClick={handleBack}>
          Atras
        </Button>
      ) : (
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
            <PaginationItem
              key={currentPage + idx}
              active={currentPage === item}
            >
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
      )}
    </>
  );
}
