// import { Product, User } from "../app/types";
// import Rating from '@mui/material/Rating';
import { Rating } from "react-simple-star-rating";
import { Product, User } from '../types';
import styled from 'styled-components'; const RootDiv = styled.div`
  svg {
    height: 20px;
    width: 20px;
  }
`

type Rating = {
  star: number,
  postedBy: User,
}

export const showAverage = (p: Product) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total: number[] = [];
    let length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((r: Rating) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("totalReduced", totalReduced);

    let highest = length * 5;
    // console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    console.log("result", result);

    return (
      <RootDiv>
<Rating ratingValue={result} fillColor="rgb(230, 67, 47)" readonly={true}/>
          ({p.ratings.length})

      </RootDiv>
       
    );
  }
};
