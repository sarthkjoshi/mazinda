import { ProgressBar } from "react-loader-spinner";

const ProgressBarLoader = () => {
  return (
    <div className="flex justify-center">
      <ProgressBar
        visible={true}
        height="35"
        borderColor="#f17e13"
        barColor="#f17e13"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default ProgressBarLoader;
