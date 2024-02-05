function Pagination ({ setPage, page }){
     

    function next(){
      page < 16 && setPage(++page)
      console.log(page)
     
    }

    function prev(){
       page > 1 && setPage(--page)
       console.log(page)
       
    }

   return(
       <div className = "flex justify-center bg-white rounded-lg font-sans p-6">
           <button onClick = {prev} className = " disabled h-10 border-2 border-grey-400 px-4 rounded-r-lg hover: bg-gray-300 hover:text-white mr-2">
               <h3 className = " text-sm font-medium">Prev</h3>
           </button>

           <button onClick = {next} className = "h-10 border-2 border-grey-400 px-4 rounded-r-lg hover: bg-gray-300 hover:text-white mr-2">
               <h3 className = "text-sm font-medium">next</h3>
           </button>
       </div>
   )
}
export default Pagination