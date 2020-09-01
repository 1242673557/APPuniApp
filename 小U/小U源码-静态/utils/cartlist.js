import {request} from "@/utils/request.js"

async function cartlist(uid,token){
	return await request ("/api/cartlist",{uid},"GET",{
		authorization:token
	})
}
export {cartlist}


