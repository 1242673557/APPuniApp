import {request} from "@/utils/request.js"

async function cartdelete(id,token){
	return await request ("/api/cartdelete",{id},"GET",{
		authorization:token
	})
}
export {cartdelete}


