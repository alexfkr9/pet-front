import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DragAndDropImg.scss";

import PetBg from "../../../../../assets/images/pet-profile-bg.svg";
import { Key } from "react";

const DragAndDropImg = ({ images, getNewOrder, onSelectFile }: any) => {
  const onDragEnd = (result: { destination: any; source: any }) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!result.destination) return;

    const reorderedItems = Array.from(images);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    // send NewOder to parent
    getNewOrder(reorderedItems);
  };

  // add more background when img > 10
  function galleryBgImg() {
    if (images.length > 10) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return [...Array(images.length + 1)];
    }
    return [...Array(10)];
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="items" direction="horizontal">
        {(provided: any) => (
          <div className="pet-gallery-wrapper">
            <div className="pet-gallery-container">
              <ul
                className="pet-gallery"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map((item: any, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: any) => (
                      <li
                        className="pet-gallery-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="img-wrapper">{item.content}</div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <li className="pet-gallery-item">
                  <div className="img-wrapper">
                    <label className="add-btn">
                      Додати фото
                      <input
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png , image/jpeg, image/jpg"
                      />
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <ul className="pet-gallery-bg">
              {galleryBgImg().map((e: any, index: Key | null | undefined) => (
                <li className="pet-gallery-bg-item" key={index}>
                  <div className="img-wrapper">
                    <img src={PetBg} alt="Bg" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropImg;
