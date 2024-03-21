function Options({ showoptions, setShowOptions }) {
  const handleClick = () => {
    setShowPopup({ status: false });
  };

  return (
    <>
      <div className="flex flex-col absolute bottom-10 right-7 box-border border-none w-[100px] h-88 border-2 p-6 rounded text-black">
        <li>
          <ul>show</ul>
          <ul>update</ul>
          <ul>delete</ul>
        </li>
      </div>
    </>
  );
}

export default Options;
