import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className="image-link-form">
      <p className="f3">upload a picture to find faces in the image.</p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            type="search"
            name=""
            id=""
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button
            onClick={onSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
