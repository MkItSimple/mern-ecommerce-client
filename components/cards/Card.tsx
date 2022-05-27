import Image from "next/image";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

// import { ItemTypes } from "./ItemTypes";

import styled from "styled-components";
import { ImageType, ItemTypes } from "../../types";
interface CardStylesProps {
  opacity: number
}
const CardStyles = styled.div<CardStylesProps>`
  position: relative;
  flex: 1;
  margin: 0.5em;
  width: 100px;
  height: 100px;
  border: 1px dashed gray;
  /* padding: 0.5rem 1rem; */
  background-color: white;
  cursor: move;
  opacity: ${(props) => props.opacity};

  /* .badge {
    width: 70px;
    position: relative;
    display: inline-block;
    margin-right: 0.2em;
  } */

  .image_container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  /* img {
    margin: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
`;

interface CardProps {
  id: number | string, 
  url: string, 
  index: number, 
  moveCard?: (dragIndex: number, hoverIndex: number) => void, 
  remove: () => void, 
  findCard?: (id: any) => {
    card: ImageType;
    index: number;
}
}
export const Card = ({ id, url, index, moveCard, remove, findCard } : CardProps) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: (item: any, _) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex !== id && findCard && moveCard) {
        const { index: hoverIndex } = findCard(id);
        moveCard(dragIndex, hoverIndex);
      }
    },
    // hover(item, monitor) {},
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <CardStyles ref={ref} opacity={opacity} data-handler-id={handlerId}>
      {/* <img src={url} alt="" /> */}
      <div className="image_container">
        <Image src={url} alt="" layout="fill" objectFit="cover"/>
      </div>
      <span className="remove" onClick={remove}>
        X
      </span>
    </CardStyles>
  );
};
