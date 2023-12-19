import { Link } from "react-router-dom"
import React from "react"

export default function Snack({ snack }) {
    return (
        <tr>
            <td>{snack.is_favorite?`\u2730`:""}</td>
            <td>
                <Link to={`/snacks/${snack.resource_id}`}>{snack.name}</Link>
            </td>
            <td>{snack.category}</td>
            <td>{snack.calories}</td>
            <td>{snack.rating}</td>
            <td>{snack.creation_date}</td>

            <td>
                <a href={snack.image} target="_blank" rel="noopener noreferrer">
                    <img
                        src={snack.image}
                        alt={`Image of ${snack.name}`}
                        style={{ height: "50px" }}
                    />
                </a>
            </td>
        </tr>
    )
}
