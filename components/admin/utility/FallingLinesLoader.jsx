import { FallingLines } from "react-loader-spinner";

const OvalLoader = () => {
  return (
    <div className="flex justify-center">
      <FallingLines
        color="black"
        width="50"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default OvalLoader;
