import {request} from "@/utils/request.js"

async function cartadd(uid,goodsid,num,token){
	return await request ("/api/cartadd",{uid,goodsid,num},"GET",{
		authorization:token
	})
}
export {cartadd}


