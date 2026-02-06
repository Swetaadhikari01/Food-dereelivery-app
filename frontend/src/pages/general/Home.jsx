import React, { useEffect, useState } from 'react'
import api from "../../api/axios";
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    api.get("/api/food", { withCredentials: true })
      .then(response => {

        console.log("Foods from API:", response.data.foods);

        // ✅ Backend already formatted video/image URLs
        setVideos(response.data.foods || []);

      })
      .catch((err) => {
        console.log("Error loading reels", err);
        setVideos([]);
      })
  }, [])


  async function likeVideo(item) {
    await api.post("/api/food/like", { foodId: item._id }, { withCredentials: true })

    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
      )
    )
  }

  async function saveVideo(item) {
    await api.post("/api/food/save", { foodId: item._id }, { withCredentials: true })

    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v
      )
    )
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  )
}

export default Home
