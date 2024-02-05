import Page from "@/components/dashboard/userdetails_dash/[...id]/user_update"
import { useRouter } from 'next/router'
 
export default function Update(){
    const router = useRouter()
    
    return(
        <Page id={router.query.id} />
    )
}
