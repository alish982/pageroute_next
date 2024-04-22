function Pagination({ setPage, page, setPerPage }) {
  function next() {
    page < 16 && setPage(++page);
  }

  function prev() {
    page > 1 && setPage(--page);
  }

  return (
    <div className="flex justify-center bg-white rounded-lg font-sans p-6">
      <select onChange={(e) => setPerPage(parseInt(e.target.value))}>
        <option className = "text-[13px]" value="25">25 per Page</option>
        <option className = "text-[13px]" value="50">50 per Page</option>
        <option className = "text-[13px]" value="75">75 per Page</option>
        <option className = "text-[13px]" value="100">100 per Page</option>
      </select>
      <button
        onClick={prev}
        className={` ${
          page === 1 ? "cursor-not-allowed" : ""
        } h-10 border-2 border-grey-400 px-4 rounded-r-lg mr-2`}
      >
        <h3 className=" text-sm font-medium">Prev</h3>
      </button>

      <button
        onClick={() => setPage("1")}
        className={`${
          page === 1 ? "text-white bg-blue-400" : ""
        } h-10 border-2 px-4 rounded-r-lg mr-2`}
      >
        <h3 className=" text-sm font-medium">1</h3>
      </button>
      <button
        onClick={() => setPage("2")}
        className={`${
          page === 2 ? "text-white bg-blue-400" : ""
        } h-10 border-2 border-grey-400 px-4 rounded-r-lg mr-2`}
      >
        <h3 className=" text-sm font-medium">2</h3>
      </button>
      <button
        onClick={() => setPage("3")}
        className={`${
          page === 3 ? "text-white bg-blue-400" : ""
        } h-10 border-2 border-grey-400 px-4 rounded-r-lg mr-2`}
      >
        <h3 className=" text-sm font-medium">3</h3>
      </button>
      <button
        onClick={() => setPage("4")}
        className={`${
          page === 4 ? "text-white bg-blue-400" : ""
        } h-10 border-2 border-grey-400 px-4 rounded-r-lg mr-2`}
      >
        <h3 className=" text-sm font-medium">4</h3>
      </button>
      
      <button
        onClick={next}
        className="h-10 border-2 border-grey-400 px-4 rounded-r-lg mr-2"
      >
        <h3 className="text-sm font-medium">next</h3>
      </button>
    </div>
  );
}
export default Pagination;
