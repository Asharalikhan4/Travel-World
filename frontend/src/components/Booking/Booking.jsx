import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./booking.css";

const Booking = ({ tour, avgRating }) => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        userId: "01",
        userEmail: "example@gmail.com",
        fullname: "Ashar Ali Khan",
        phone: "1234567890",
        guestSize: 1,
        bookAt: ""
    });

    const { price, reviews } = tour;

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    // Send data to the server
    const handleClick = e => {
        e.preventDefault();
        console.log(credentials);
        navigate("/thank-you");
    }

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>${price} <span>/per person</span></h3>
                <span className="tour__rating align-items-center">
                    <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>
            <div className="booking__form">
                <h5>Information</h5>
                <Form className="booking__info-form" onSubmit={handleClick}>
                    <FormGroup>
                        <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input type="date" placeholder="" id="bookAt" required onChange={handleChange} />
                        <input type="number" placeholder="Guest Size" id="guestSize" required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">${price} <i className="ri-close-line"> 1 person</i></h5>
                        <span> ${price}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Service charge</h5>
                        <span> ${serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span> ${totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
            </div>
        </div>
    );
};

export default Booking;