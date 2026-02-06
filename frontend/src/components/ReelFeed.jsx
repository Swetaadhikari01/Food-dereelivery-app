import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())

  // 🎯 Auto play when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0.6] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))

    return () => {
      videoRefs.current.forEach((vid) => observer.unobserve(vid))
      observer.disconnect()
    }
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id)
      return
    }
    videoRefs.current.set(id, el)
  }

  useEffect(() => {
    document.body.classList.add("reels-open")
    return () => document.body.classList.remove("reels-open")
  }, [])

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">

        {items.length === 0 && (
          <div className="empty-state">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => {
          const partnerId =
            typeof item.foodPartner === "object"
              ? item.foodPartner?._id
              : item.foodPartner

          return (
            <section key={item._id} className="reel" role="listitem">

              {/* 🎬 VIDEO OR IMAGE */}
              {item.video ? (
                <video
                  ref={setVideoRef(item._id)}
                  className="reel-video"
                  src={item.video}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                />
              ) : item.image ? (
                <img
                  className="reel-video"
                  src={item.image}
                  alt={item.name}
                />
              ) : (
                <div className="reel-video" style={{
                  background: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#888"
                }}>
                  No Media
                </div>
              )}

              {/* 🎨 OVERLAY */}
              <div className="reel-overlay">
                <div className="reel-overlay-gradient" aria-hidden="true" />

                {/* ❤️ ACTIONS */}
                <div className="reel-actions">
                  <div className="reel-action-group">
                    <button
                      onClick={onLike ? () => onLike(item) : undefined}
                      className="reel-action"
                    >
                      ❤️
                    </button>
                    <div className="reel-action__count">
                      {item.likeCount ?? 0}
                    </div>
                  </div>

                  <div className="reel-action-group">
                    <button
                      onClick={onSave ? () => onSave(item) : undefined}
                      className="reel-action"
                    >
                      🔖
                    </button>
                    <div className="reel-action__count">
                      {item.savesCount ?? 0}
                    </div>
                  </div>

                  <div className="reel-action-group">
                    <button className="reel-action">💬</button>
                    <div className="reel-action__count">
                      {item.commentsCount ?? 0}
                    </div>
                  </div>
                </div>

                {/* 📝 DESCRIPTION + STORE */}
                <div className="reel-content">
                  <p className="reel-description">{item.description}</p>

                  {(() => {
                    const partnerId =
                      typeof item.foodPartner === "object"
                        ? item.foodPartner?._id
                        : item.foodPartner;

                    return partnerId ? (
                      <Link
                        className="reel-btn"
                        to={`/profile/${partnerId}`}
                        aria-label="Visit store"
                      >
                        Visit store
                      </Link>
                    ) : null;
                  })()}

                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default ReelFeed
