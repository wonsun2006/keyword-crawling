import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

const HeadingCard = ({ icon, title, description }) => {
  const iconStyle = {
    color: "#EF233C",
  };
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>
          <h1 className="display-1" style={iconStyle}>
            {icon}
          </h1>
        </Card.Title>
        <Card.Title>
          <h3 className="py-3">
            <strong>{title}</strong>
          </h3>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HeadingCard;
