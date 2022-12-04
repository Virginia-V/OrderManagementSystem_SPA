import "./card.scss";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Model from "./model";

interface CardProps {
  model: Model;
  title: string;
  path: string;
  isMoney: boolean;
  link: string;
  Icon: React.ComponentType<any>;
}

const Card = ({ model, Icon, title, path, isMoney, link }: CardProps) => {
  const [counter, setCounter] = useState("");

  const populate = async () => {
    const newCounter = await model.provideCounter();
    setCounter(newCounter);
  };

  useEffect(() => {
    populate();
  }, []);

  return (
    <div className="card">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">
          {isMoney && "$"} {counter}
        </span>
        <Link to={path} style={{ textDecoration: "none" }}>
          <span className="link">{link}</span>
        </Link>
      </div>
      <div className="right">
        <Icon />
      </div>
    </div>
  );
};

export default Card;
