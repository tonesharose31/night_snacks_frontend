
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import "./SnackEditForm.css"
import {
    LoginBackground2,
    LoginHeader,
    LoginLabel,
    FormInput,
    LoginButton
} from '../styles/loginElements';
const API = import.meta.env.VITE_API_URL

export default function ArtworkEditForm() {
    let { resource_id } = useParams()
    const [snack, setSnack] = useState({
        name: "",
        image: "",
        category: "",
        calories: 0,
        rating: 0,
        is_favorite: false
    })
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setSnack({
            ...snack,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const updateSnack = () => {
        fetch(`${API}/snacks/${resource_id}`, {
            method: "PUT",
            body: JSON.stringify(artwork),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    alert(`Snack ${data.name} successfully updated!`)
                    navigate(`/snacks/${resource_id}`)
                }
            })
            .catch((error) => {
                alert(error)
                console.error(error)
            })
    }

    useEffect(() => {
        fetch(`${API}/snacks/${resource_id}`)
            .then((response) => response.json())
            .then((responseJSON) => {
                setSnack(responseJSON)
            })
            .catch((error) => console.error("Error:", error))
    }, [resource_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateSnack()
    }

    const handleBack = () => {
        navigate(`/snacks/${resource_id}`)
    }

    return (
        <div className="form-edit-snack">
            





            
          <LoginBackground2 onSubmit={handleSubmit}>
            <LoginLabel>
            <LoginHeader>Edit Snack</LoginHeader>
            
            </LoginLabel>

            <Form className="form" noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            name="name"
                            type="text"
                            placeholder="snack name"
                            value={snack.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="image">
                        <Form.Label>Image Link</Form.Label>
                        <Form.Control
                            name="image"
                            type="text"
                            placeholder="Image URL"
                            value={snack.image}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            name="category"
                            type="text"
                            placeholder="food group category"
                            value={snack.category}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="calories">
                        <Form.Label>Calories</Form.Label>
                        <Form.Control
                            name="calories"
                            type="number"
                            placeholder="calories"
                            value={snack.calories}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            name="raing"
                            type="number"
                            placeholder="rating"
                            value={snack.rating}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="is_favorite">
                    <Form.Label>Is Favorite</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="is_favorite"
                        onChange={handleInputChange}
                        checked={snack.is_favorite}
                    />
                </Form.Group>
                <div className="form-edit-button">
                    <button className="btn btn-secondary btn-sm" variant="primary" type="submit">
                        Update Snack
                    </button>
                    <button className="btn btn-secondary btn-sm" variant="primary" onClick={handleBack} type="submit">
                        Back
                    </button>
                </div>
            </Form>

            <LoginButton >{'Sign In'}</LoginButton>
          </LoginBackground2>
    
        </div>
    )
}