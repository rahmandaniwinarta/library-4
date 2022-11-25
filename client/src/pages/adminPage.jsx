/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import { logout } from "../redux/adminSlice";
import Swal from "sweetalert2";

export const adminPage = () => {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState();
  const [category, setCategory] = useState();
  const [direction, setDirection] = useState();
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(0);
  const [bookId, setbookId] = useState();

  //edit data buku
  const title = useRef("");
  const author = useRef("");
  const categoryEdit = useRef("");
  const publisher = useRef("");
  const year = useRef("");

  //admin keep login and logout
  const { username } = useSelector((state) => state.adminSlice.value);
  console.log(username);
  const dispatch = useDispatch();

  const url = "http://localhost:2000/book";

  const getBooks = async () => {
    try {
      const newURL = category
        ? url + `filter?genre=${category}&`
        : `${url}all?`;
      const sortURL = sort ? newURL + `sort=${sort}` : newURL;

      console.log(bookId);
      const directionURL = direction
        ? sortURL + `direction=${direction}&`
        : sortURL;

      const paginationURl = directionURL + `pagination=${pagination}`;
      const res = await Axios.get(paginationURl);

      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const onLogoutAdmin = () => {
    dispatch(logout());
    localStorage.removeItem("tokenAdmin");
  };

  useEffect(() => {
    getBooks();
  }, [category, sort, direction, pagination, num, bookId]);

  const urlEdit = "http://localhost:2000/book/update/${bookId}";

  const editBook = async () => {
    try {
      const editData = {
        title,
        publisher,
        author,
        categoryEdit,
        year,
      };
    
  const resultEdit = Axios.patch(urlEdit, editData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Edit Success",
        text: "Update Success",
        timer: 1000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const popOver = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Update Buku</Popover.Header>
      <popOver.Body>
        <Form.Group className="mb-2">
          <Form.Label> Title </Form.Label>
          <Form.Control placeholder="item.title" ref={title} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label> Publisher </Form.Label>
          <Form.Control placeholder="item.publisher" ref={publisher} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label> Author </Form.Label>
          <Form.Control placeholder="item.author" ref={author} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label> Category </Form.Label>
          <Form.Control placeholder="item.category" ref={categoryEdit} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label> Year </Form.Label>
          <Form.Control placeholder="item.year" ref={year} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={editBook}>
          Confirm Update
        </Button>
      </popOver.Body>
    </Popover>
  );

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <NavDropdown title={username} id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/loginAdmin" onClick={onLogoutAdmin}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>

      <div className="container">
        <DropdownButton id="dropdown-item-button" title="filter">
          <Dropdown.Item
            as="button"
            onClick={() => {
              setCategory();
              setSort();
              setDirection();
            }}
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setCategory("romance");
              setSort();
              setDirection();
              setPagination(0);
              setPage(1);
            }}
          >
            Romance
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setCategory("Horror");
              setSort();
              setDirection();
              setPagination(0);
              setPage(1);
            }}
          >
            Horror
          </Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="dropdown-item-button" title="Sort">
          <Dropdown.Item
            as="button"
            onClick={() => {
              setSort("title");
              setDirection("ASC");
              setPagination(0);
              setPage(1);
            }}
          >
            Title ASC
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setSort("title");
              setDirection("DESC");
              setPagination(0);
              setPage(1);
            }}
          >
            Title DESC
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              num >= 2 ? setNum(0) : setNum(num + 1);
            }}
          >
            Title
          </Dropdown.Item>
        </DropdownButton>
        <div className="containerHome">
          <Table striped bordered hover variant="dark" size="lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Year</th>
              </tr>
            </thead>
            {books.map((item, index) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.author}</td>
                      <td>{item.publisher}</td>
                      <td>{item.category}</td>
                      <td>{item.year}</td>
                      <div classname="d-flex flex-row justify-content-right align-items-right">
                        <OverlayTrigger
                          trigger="click"
                          placement="right"
                          overlay={popOver}
                        >
                          <Button
                            variant="success"
                            onClick={() => setbookId(item.id)}
                          >
                            Update Buku
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </Table>
        </div>

        <div className="containerButton">
            {books.length === 10 ? (
                <Button
                variant="primary"
                onClick={()=>{
                    setPagination(pagination + 8);
                    setPage(page + 1);
                }}>
                    Next
                </Button>
            ):( <Button variant="primary" disabled>
            </Button>)}
                <h3>Page {page}</h3>

                {page !== 1 ? (
                    <Button
                    variant="primary"
                    onClick={()=>{
                        setPagination(pagination-8);
                        setPage(page-1);
                    }}>Previous</Button>
                ):(
                    <Button variant="primary" disabled>
                        Previous
                    </Button>
                )}
        </div>
      </div>
    </>
  );
};
