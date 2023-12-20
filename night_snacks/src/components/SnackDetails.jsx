import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import React from 'react'
import "./SnackDetails.css"
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
            <table className=" table table-bordered table-responsive ">
                <tbody>
                    <tr className="fav">
                        <th colSpan="4"> Favorite: {snack.is_favorite ? `\u2730` : ""} </th>
                    </tr>
                    <tr className="Name">
                        <th colSpan="4"> Name: {snack.name} </th>
                    </tr>
                    <tr className="category">
                        <th colSpan="4"> Category: {snack.category} </th>
                    </tr>
                    <tr className="calories">
                        <th colSpan="4"> Calories: {snack.calories} </th>
                    </tr>
                    <tr className="rating">
                        <th colSpan="4"> Rating: {snack.rating} </th>
                    </tr>
                </tbody>
                <tbody >
                    <tr >
                        <th colSpan="4">
                            <img  
                                src={snack.image}
                                alt={`Image of ${snack.name}`}
                            />
                        </th>
                    </tr>
                </tbody>
            </table>
            <div className="show-navigation">
                <button className="btn btn-secondary btn-sm" onClick={handleDelete}>
                    Delete
                </button>
                <button disabled className="btn btn-secondary btn-sm" onClick={() => navigate(`/snacks/${resource_id}/edit`)}>
                    Edit Artist
                </button>
            </div>
            <br></br>
        </article>
    )
}

export default SnackDetails

