
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import "./SnackEditForm.css"
import {
    LoginBackground3,
    LoginHeader,
    LoginHeaderV2,
    LoginHeaderV3,
    LoginLabel,
    FormInput,
    LoginButton6
} from '../styles/loginElements';
const API = import.meta.env.VITE_API_URL

export default function SnackEditForm() {
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
            body: JSON.stringify(snack),
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
            <LoginBackground3 >
                <LoginLabel>
                    <LoginHeaderV3>Edit Snack</LoginHeaderV3>
                </LoginLabel>

                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="name">
                            <LoginHeaderV2>Name</LoginHeaderV2>
                            <Form.Control
                                className="useLoginStyle"
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
                            <LoginHeaderV2>Image Link</LoginHeaderV2>
                            <Form.Control
                            className="useLoginStyle"
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
                            <LoginHeaderV2>Category</LoginHeaderV2>
                            <Form.Control
                            className="useLoginStyle"
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
                            <LoginHeaderV2>Calories</LoginHeaderV2>
                            <Form.Control
                            className="useLoginStyle"
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
                            <LoginHeaderV2>Rating</LoginHeaderV2>
                            <Form.Control
                            className="useLoginStyle"
                                name="rating"
                                type="number"
                                placeholder="rating"
                                value={snack.rating}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="is_favorite">
                        <LoginHeaderV2>Is Favorite</LoginHeaderV2>
                        <Form.Check
                            type="checkbox"
                            name="is_favorite"
                            onChange={handleInputChange}
                            checked={snack.is_favorite}
                        />
                    </Form.Group>
                    <LoginButton6 className="btn btn-secondary btn-sm" variant="primary" type="submit">
                        Update Snack
                    </LoginButton6>
                    <LoginButton6 className="btn btn-secondary btn-sm" variant="primary" onClick={handleBack} type="submit">
                        Back
                    </LoginButton6>
                </Form>
            </LoginBackground3>
        </div>
    )
}