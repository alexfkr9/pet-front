import React, { useEffect, useState } from "react";
import "./ImagesUpload.scss";

import { Modal } from "react-bootstrap";
import DragAndDropImg from "./DragAndDropImg/DragAndDropImg";

interface ImagesUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  getImageArr: any;
  isSubmit: boolean;
  setActiveInput: any;
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({
  getImageArr,
  isSubmit,
  setActiveInput
}) => {
  const [selectedImages, setSelectedImages] = useState([]);

  function getNewOrder(arr: any) {
    const NewOderBlobArr = [...arr];
    const newOderFileArr = NewOderBlobArr.map((item: any, index: number) => {
      return selectedImages[Number(item.id)];
    });
    setSelectedImages(newOderFileArr);
  }

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const onSelectFile = (event: any) => {
    setActiveInput(true); // for enable submit button

    const selectedFiles = event.target.files;

    const selectedFilesArray: any = Array.from(selectedFiles);

    const MAX_FILE_SIZE = 5120; // 5MB

    const checkSizeImagesArray: any = selectedFilesArray.map((file: any) => {
      const fileSizeKiloBytes = file.size / 1024;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        return null;
      }
      return file;
    });

    const imagesArray = checkSizeImagesArray.filter((a: any) => a);
    if (checkSizeImagesArray.length !== imagesArray.length) {
      handleShow();
    }

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  // delete selected image
  function deleteHandler(image: any) {
    setSelectedImages(selectedImages.filter((e, index) => index !== image));
    URL.revokeObjectURL(image);
  }

  const selectedImagesBlob: any = selectedImages?.map((file: any) => {
    return URL.createObjectURL(file);
  });

  useEffect(() => {
    getImageArr(selectedImages);
  });

  const cards = selectedImagesBlob.map(
    (image: string | undefined, index: React.Key | null | undefined) => {
      return {
        id: String(index),
        content: (
          <>
            <img src={image} alt="Фото" width="188" height="141" />
            <div
              className="del-icon"
              onClick={() => {
                deleteHandler(index);
              }}
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 1024 990"
                fill="#000000"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
                  fill=""
                />
                <path
                  d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
                  fill=""
                />
                <path d="M328 340.8l32-31.2 348 348-32 32z" fill="" />
              </svg>
            </div>
          </>
        )
      };
    }
  );

  return (
    <div className="pet-image-upload">
      <h3 className="title">Фото</h3>
      <p className="text">
        Перше фото буде на обкладинці оголошення. Перетягніть, щоб змінити
        порядок фото.
      </p>
      {Boolean(isSubmit) && selectedImagesBlob.length === 0 && (
        <p className="has-error">Не додано жодної фотографії</p>
      )}

      {selectedImages.length > 0 && selectedImages.length > 10 && (
        <p className="has-error">
          Ви не можете додати більше 10 фото. Видаліть
          <b> {selectedImages.length - 10} </b> з них
        </p>
      )}
      <DragAndDropImg
        images={cards}
        getNewOrder={getNewOrder}
        onSelectFile={onSelectFile}
      />

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="bg-warning">
          Увага
        </Modal.Header>
        <Modal.Body>Ви не можете додавати фото розміром більше 5 мб</Modal.Body>
        <Modal.Footer className="sniff-modal-footer">
          Оберіть інші або відредагуйте
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImagesUpload;
