// import { NextResponse } from "next/server"
// import { instanceOfAxios } from "@/components/others/localstorage"


// function middleware(request){
//    console.log("response outside")
//        const data =  async () => {
//             console.log("half inside")
//         await instanceOfAxios.get(`customer?page=` + page + "&per_page=" + perpage, 
//         )
//         let response = await data.json();
//         response.status === 200 ? ( NextResponse.redirect( new URL("/", request.url) ) ) : ""
// }}
// export const config = {
//     matcher: ['/dash'],
// }

// export default middleware


// import { NextResponse } from 'next/server'
 
// export function middleware(request) {

//   let cookie = request.cookies.get('nextjs')
//   console.log(cookie) 
//   const allCookies = request.cookies.getAll()
//   console.log(allCookies) 
 
//   request.cookies.has('nextjs') 
//   request.cookies.delete('nextjs')
//   request.cookies.has('nextjs')
 
  
//   const response = NextResponse.next()
//   response.cookies.set('', '')
//   response.cookies.set({
//     name: 'vercel',
//     value: 'fast',
//     path: '/',
//   })
//   cookie = response.cookies.get('vercel')
//   console.log(cookie)
 
//   return response
// }

import Cookies from 'js-cookie'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req){
    console.log(req)
    const checkCookie = req.cookies.get("auth")
    console.log("cook ", req.cookies)
    if (!checkCookie) {
        console.log("this is inside if")
        return NextResponse.redirect(new URL('/', req.url))
    } 
    return NextResponse.next()
 }

export const config = { 
    matcher: [ "/dash/:path*", "/auth/:path*" ]
}