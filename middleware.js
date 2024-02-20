
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req){
    const checkCookie = req.cookies.get("auth")
    if (!checkCookie) {
        return NextResponse.redirect(new URL('/', req.url))
    } 
    return NextResponse.next()
 }

export const config = { 
    matcher: [ "/dash/:path*", "/auth/:path*" ]
}