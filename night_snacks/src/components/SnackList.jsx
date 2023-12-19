import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Snack from "./Snack";
import "./SnackList.css"

const API = import.meta.env.VITE_API_URL;

export default function SnackList() {
    const [allSnacks, setAllSnacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [snacksPerPage, setSnacksPerPage] = useState(10);
    const [snacksOrder, setSnacksOrder] = useState(false);
    const navigate = useNavigate();

    const changeSnackOrder = () => {
        if (snacksOrder === false) {
            setSnacksOrder(true)
            const newOrder = allSnacks.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return -1
                else if (a.name.toLowerCase() > b.name.toLowerCase())
                    return 1
                else
                    return 0
            })
            setAllSnacks(newOrder)
        }
        else {
            setSnacksOrder(false)
            const newOrder = allSnacks.sort((b, a) => {
                if (a.name.toLowerCase() < b.name.toLowerCase())
                    return -1
                else if (a.name.toLowerCase() > b.name.toLowerCase())
                    return 1
                else
                    return 0
            })
            setAllSnacks(newOrder)
        }
    }

    const handleSortSnacks = event => {
        event.preventDefault()
        changeSnackOrder()
    }

    useEffect(() => {
        fetch(`${API}/snacks`)
            .then((response) => response.json())
            .then((snacks) => {
                setAllSnacks(snacks);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const indexOfLastSnack = currentPage * snacksPerPage;
    const indexOfFirstSnack = indexOfLastSnack - snacksPerPage;
    const currentSnacks = allSnacks.slice(indexOfFirstSnack, indexOfLastSnack);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="snacks-container">
            <section>
                <Table className="table" striped bordered hover>
                    <thead>
                        <tr className="table-row">
                            <th className="favorite">{`\u2730`}</th>
                            <th className="name">
                                <Button className="atlBtnColor-sort btn-secondary btn-sm" onClick={handleSortSnacks}>
                                    Snack Name {` \u21f3`}
                                </Button>
                            </th>
                            <th >Category</th>
                            <th >Calories</th>
                            <th >Rating</th>
                            <th >Date Created </th>
                            <th >Image</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentSnacks.map((snack) => {
                            return (
                                <Snack
                                    key={snack.resource_id}
                                    snack={snack}
                                />
                            );
                        })}
                    </tbody>
                </Table>
                <div className="snack-container-pagination">
                    <Button
                        className="btn btn-secondary btn-sm"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="primary"
                    >
                        Previous
                    </Button>

                    <div className="spacing">Page {currentPage}</div>

                    <Button
                        className="btn btn-secondary "
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastSnack >= allSnacks.length}
                        variant="primary"
                    >
                        Next
                    </Button>
                </div>
            </section>
        </div>
    );
}
