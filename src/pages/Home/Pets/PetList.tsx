import React from "react";
import PetCard from "../../../components/PetCard/PetCard";

const PetList = ({ sorterData, lastPostRef }: any) => {
  // step for Pet Card
  let stepRight = 5;
  let stepLeft = 0;

  // Position for Pet Card
  let positionRowStart = 2;
  let positionRowEnd = 4;

  return (
    <div className="sniff-pets-list">
      {sorterData?.map((post: any, index: number) => {
        const postId = post.id;
        const key = `${postId}_${index}`;

        let rowStart = 0;
        let colStart = 0;
        let rowEnd = 0;
        let colEnd = 0;
        let imgSize = "220px";

        if (index === stepRight) {
          imgSize = "644px";
          rowStart = positionRowStart;
          rowEnd = positionRowEnd;

          // right
          colStart = 2;
          colEnd = 4;

          // add new position
          positionRowStart = positionRowEnd + 2;
          positionRowEnd += 4;
          stepLeft = stepRight + 9;
        }

        if (index === stepLeft && index >= 14) {
          imgSize = "644px";
          rowStart = positionRowStart;
          rowEnd = positionRowEnd;

          // left
          colStart = 1;
          colEnd = 3;

          // add new position
          positionRowStart = positionRowEnd + 2;
          positionRowEnd += 4;
          stepRight = stepLeft + 9;
        }

        const itemStyles = {
          gridRowStart: rowStart,
          gridColumnStart: colStart,
          gridRowEnd: rowEnd,
          gridColumnEnd: colEnd
        };

        return (
          <PetCard
            post={post}
            key={key}
            gridPosition={itemStyles}
            imgSize={imgSize}
            ref={index === sorterData.length - 1 ? lastPostRef : undefined}
          />
        );
      })}
    </div>
  );
};

export default PetList;
