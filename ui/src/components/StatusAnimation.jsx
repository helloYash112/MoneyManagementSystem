import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LottiePlayer from "./LottiePlayer.jsx";
import authentication from "../assets/loading.json";

const MIN_DISPLAY_TIME = 5000;

const StatusAnimation = () => {
  const loading = useSelector((state) => state.user.loading);

  const [showAnimation, setShowAnimation] = useState(false);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (loading) {
      setShowAnimation(true);
      startTimeRef.current = Date.now();

      return;
    }

    if (!startTimeRef.current) {
      return;
    }

    const elapsedTime = Date.now() - startTimeRef.current;
    const remainingTime = Math.max(
      MIN_DISPLAY_TIME - elapsedTime,
      0
    );

    const timer = setTimeout(() => {
      setShowAnimation(false);
      startTimeRef.current = null;
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [loading]);

  if (!showAnimation) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <LottiePlayer
        animationData={authentication}
        message="Checking user data..."
        loop={true}
      />
    </div>
  );
};

export default StatusAnimation;