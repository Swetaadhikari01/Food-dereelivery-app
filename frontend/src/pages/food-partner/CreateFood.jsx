import React, { useEffect, useMemo, useRef, useState } from 'react';
import api from "../../api/axios";
import '../../styles/create-food.css';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [fileError, setFileError] = useState('');

  const fileInputRefVideo = useRef(null);
  const fileInputRefImage = useRef(null);
  const navigate = useNavigate();

  /* ================= PREVIEWS ================= */

  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  useEffect(() => {
    if (!imageFile) {
      setImageURL('');
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImageURL(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  /* ================= FILE HANDLERS ================= */

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file');
      return;
    }

    // 🔥 Reel = video only
    setImageFile(null);
    setImageURL('');
    setFileError('');
    setVideoFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file');
      return;
    }

    // 🔥 Food item = image only
    setVideoFile(null);
    setVideoURL('');
    setFileError('');
    setImageFile(file);
  };

  const openVideoDialog = () => fileInputRefVideo.current?.click();
  const openImageDialog = () => fileInputRefImage.current?.click();

  /* ================= SUBMIT ================= */

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!price || isNaN(price)) {
      alert("Enter valid price");
      return;
    }

    if (!videoFile && !imageFile) {
      alert("Upload either a video or an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    if (videoFile) formData.append("video", videoFile);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await api.post("/api/food", formData, { withCredentials: true });

      // foodPartner id comes from backend response
      const partnerId = res.data.food.foodPartner;

      navigate(`/profile/${partnerId}`);


      alert("Food added successfully 🍔");
      navigate(`/profile/${partnerId}`);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating food");
    }
  };

  const isDisabled = useMemo(
    () => !name.trim() || !price || (!videoFile && !imageFile),
    [name, price, videoFile, imageFile]
  );

  /* ================= UI ================= */

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <header className="create-food-header">
          <h1 className="create-food-title">Create Food</h1>
        </header>

        <form className="create-food-form" onSubmit={onSubmit}>

          {/* VIDEO (REEL) */}
          <div className="field-group">
            <label>Food Reel (Video)</label>
            <input
              type="file"
              ref={fileInputRefVideo}
              accept="video/*"
              hidden
              onChange={handleVideoChange}
            />
            <button type="button" onClick={openVideoDialog}>
              Upload Video
            </button>

            {videoURL && (
              <video
                src={videoURL}
                controls
                muted
                playsInline
                style={{ width: "100%", marginTop: "8px" }}
              />
            )}
          </div>

          {/* IMAGE (FOOD ITEM) */}
          <div className="field-group">
            <label>Food Image</label>
            <input
              type="file"
              ref={fileInputRefImage}
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <button type="button" onClick={openImageDialog}>
              Upload Image
            </button>

            {imageURL && (
              <img
                src={imageURL}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  marginTop: "8px"
                }}
              />
            )}
          </div>

          {fileError && <p style={{ color: "red" }}>{fileError}</p>}

          <div className="field-group">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="field-group">
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          </div>

          <div className="field-group">
            <label>Price (₹)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isDisabled}>
              Save Food
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateFood;
