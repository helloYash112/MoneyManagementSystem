import * as LottieModule from "lottie-react";

const Lottie = LottieModule.default?.default ?? LottieModule.default;

const LottiePlayer = ({ animationData, message, loop = true }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={true}
        style={{
          width: 180,
          height: 180,
        }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
      />

      {message && (
        <p className="mt-3 text-center text-base font-medium text-white">
          {message}
        </p>
      )}
    </div>
  );
};

export default LottiePlayer;