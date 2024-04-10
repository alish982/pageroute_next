import Image from "next/image";

function Success({ showPopup, setShowPopup }) {
  const handleClick = () => {
    setShowPopup({ status: false });
  };

  return (
    <>
      <div className="flex flex-row absolute bottom-10 right-7 box-border border-none w-[399px] h-88 border-2 p-6 rounded bg-[#F6F6F6]">
        <button
          onClick={handleClick}
          className="absolute top-0 right-0 rounded-md p-2 inline-flex items-center justify-center hover:bg-gray-100 "
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-2">
          <Image
            className="mt-1"
            src={showPopup.statusCode === 200 ? "/success.png" : "/failed.png"}
            alt=""
            height="31"
            width="31"
          />
        </div>
        <div className="p-2">
          <p className="mb-1 text-[#191D23] text-opacity-70 font-bold">
            {showPopup.message}
          </p>
          <p className="mt-1 text-sm text-[#191D23] text-opacity-40">
            {showPopup.messageDetails}
          </p>
        </div>
      </div>
    </>
  );
}

export default Success;
