import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import React from 'react'
import "./SnackDetails.css"
import {
    LoginButton5,
} from '../styles/loginElements'
const API = import.meta.env.VITE_API_URL

function SnackDetails() {
    const [snack, setSnack] = useState({
        resource_id: 0,
        user_id: 0,
        name: "",
        image: "",
        category: "",
        calories: 0,
        rating: 0,
        is_favorite: false,
        creation_date: ""
    })

    let navigate = useNavigate()
    let { resource_id } = useParams()

    useEffect(() => {
        fetch(`${API}/snacks/${resource_id}`)
            .then(response => response.json())
            .then(snack => {
                setSnack(snack)
            })
            .catch(() => navigate("/not-found"))
    }, [resource_id, navigate])

    const handleDelete = () => {
        const httpOptions = { "method": "DELETE" }
        fetch(`${API}/snacks/${resource_id}`, httpOptions)
            .then(response => response.json())
            .then((res) => {
                alert(`snacks ${res.deletedSnack.name} was deleted!`)
                navigate('/snacks')
            })
            .catch((err) => console.error(err))
    }

    return (
        <article className="top">
            <table className=" table table-dark table-striped table-hover table-responsive ">
                <tbody>
                    <tr className="fav">
                        <td colSpan="4"> Favorite: {snack.is_favorite ? `\u2B50` : `\u274C`} </td>
                    </tr>
                    <tr className="Name">
                        <td colSpan="4"> Name: {snack.name} </td>
                    </tr>
                    <tr className="category">
                        <td colSpan="4"> Category: {snack.category} </td>
                    </tr>
                    <tr className="calories">
                        <td colSpan="4"> Calories: {snack.calories} </td>
                    </tr>
                    <tr className="rating">
                        <td colSpan="4"> Rating: {snack.rating} </td>
                    </tr>
                </tbody>
                <tbody >
                    <tr  >
                        <td colSpan="4">
                            <img
                                src={snack.image}
                                alt={`Image of ${snack.name}`}
                                style={{
                                    height: "250px",
                                    width: "250px",
                                    float: "center"
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="show-navigation">
                <LoginButton5 className="btn btn-secondary btn-sm" onClick={handleDelete}>
                    Delete
                </LoginButton5>
                <LoginButton5 className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
                    <span>Back</span>
                </LoginButton5>
                <LoginButton5 className="btn btn-secondary btn-sm" onClick={() => navigate(`/snacks/${resource_id}/edit`)}>
                    Edit Snack
                </LoginButton5>
            </div>
            <br></br>
        </article>
    )
}

export default SnackDetails

