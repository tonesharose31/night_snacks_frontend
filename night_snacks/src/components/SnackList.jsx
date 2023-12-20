import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Snack from "./Snack";
import "./SnackList.css"
import {
    LoginBackground2,
    LoginHeader,
    LoginLabel,
    FormInput,
    LoginButton2,
    LoginButton3,
    LoginButton4,
} from '../styles/loginElements';

const API = import.meta.env.VITE_API_URL;

export default function SnackList() {
    const [allSnacks, setAllSnacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [snacksPerPage, setSnacksPerPage] = useState(10);
    const [snacksOrder, setSnacksOrder] = useState(false);
    const navigate = useNavigate();
    const [categoryOrder, setCategoryOrder] = useState(false)
    const [caloriesOrder, setCaloriesOrder] = useState(false)
    const [ratingOrder, setRatingOrder] = useState(false)
    const [favOrder, setFavOrder] = useState(false)

    const changeOrderCat = () => {
        if (categoryOrder === false) {
            setCategoryOrder(true)
            fetch(`${API}/snacks/?order=ascCat`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)
                })
                .then((res) => {
                    navigate('/snacks/?order=ascCat')
                })
                .catch(error => console.log(error))
        }
        else {
            setCategoryOrder(false)
            fetch(`${API}/snacks/?order=descCat`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)
                })
                .then((res) => {
                    navigate('/snacks/?order=descCat')
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderCal = () => {
        if (caloriesOrder === false) {
            setCaloriesOrder(true)
            fetch(`${API}/snacks/?order=ascCal`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)                    
                })
                .then((res) => {
                    navigate('/snacks/?order=ascCal')
                })
                .catch(error => console.log(error))
        }
        else {
            setCaloriesOrder(false)
            fetch(`${API}/snacks/?order=descCal`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)                    
                })
                .then((res) => {
                    navigate('/snacks/?order=descCal')
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderFav = () => {
        if (favOrder === false) {
            setFavOrder(true)
            fetch(`${API}/snacks/?is_favorite=true`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)                    
                })
                .then((res) => {
                    navigate('/snacks/?is_favorite=true')
                })
                .catch(error => console.log(error))
        }
        else {
            setFavOrder(false)
            fetch(`${API}/snacks/?is_favorite=false`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)                    
                })
                .then((res) => {
                    navigate('/snacks/?is_favorite=false')
                })
                .catch(error => console.log(error))
        }
    }

    const changeOrderRa = () => {
        if (ratingOrder === false) {
            setRatingOrder(true)
            fetch(`${API}/snacks/?order=ascRa`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)                    
                })
                .then((res) => {
                    navigate('/snacks/?order=ascRa')
                })
                .catch(error => console.log(error))
        }
        else {
            setRatingOrder(false)
            fetch(`${API}/snacks/?order=descRa`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)                    
                })
                .then((res) => {
                    navigate('/snacks/?order=descRa')
                })
                .catch(error => console.log(error))
        }
    }

    const changeSnacksOrder = () => {
        if (snacksOrder === false) {
            setSnacksOrder(true)
            fetch(`${API}/snacks/?order=asc`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)
                })
                .then((res) => {
                    navigate('/snacks/?order=asc')
                })
                .catch(error => console.log(error))
        }
        else {
            setSnacksOrder(false)
            fetch(`${API}/snacks/?order=desc`)
                .then((response) => response.json())
                .then(snacks => {
                    setAllSnacks(snacks)
                })
                .then((res) => {
                    navigate('/snacks/?order=desc')
                })
                .catch(error => console.log(error))
        }
    }

    const handleSortSnacks = event => {
        event.preventDefault()
        changeSnacksOrder()
    }

    const handleSortSnacksCat = event => {
        event.preventDefault()
        changeOrderCat()
    }

    const handleSortSnacksFav = event => {
        event.preventDefault()
        changeOrderFav()
    }

    const handleSortSnacksCal = event => {
        event.preventDefault()
        changeOrderCal()
    }

    const handleSortSnacksRa = event => {
        event.preventDefault()
        changeOrderRa()
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
            <section className="wrap">
                <Table className="table table-dark table-responsive" striped bordered hover>
                    <thead>
                        <tr className="table-row">
                            
                            <th className="favorite">
                                <LoginButton4 className="atlBtnColor-sort btn-secondary btn-sm" onClick={handleSortSnacksFav}>
                                {`\u2B50`}
                                </LoginButton4>
                            </th>
                            <th className="name">
                                <LoginButton3 className="atlBtnColor-sort btn-secondary btn-sm" onClick={handleSortSnacks}>
                                    Snack Name {` \u21f3`}
                                </LoginButton3>
                            </th>
                            <th className="name">
                                <LoginButton3 className="atlBtnColor-sort btn-secondary btn-sm" onClick={handleSortSnacksCat}>
                                    Category {` \u21f3`}
                                </LoginButton3>
                            </th>
                            <th className="name">
                                <LoginButton3 className="atlBtnColor-sort btn-secondary btn-sm" onClick={handleSortSnacksCal}>
                                    Calories {` \u21f3`}
                                </LoginButton3>
                            </th>
                            <th className="name">
                                <LoginButton3 className="atlBtnColor-sort btn-secondary btn-sm" onClick={handleSortSnacksRa}>
                                    Rating {` \u21f3`}
                                </LoginButton3>
                            </th>
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
                    <LoginButton2
                        className="btn btn-secondary btn-sm"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="primary"
                    >
                        Previous
                    </LoginButton2>

                    <div className="spacing">Page {currentPage}</div>

                    <LoginButton2
                        className="btn btn-secondary "
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastSnack >= allSnacks.length}
                        variant="primary"
                    >
                        Next
                    </LoginButton2>
                </div>
            </section>
        </div>
    );
}
