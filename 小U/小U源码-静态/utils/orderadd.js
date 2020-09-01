import {request} from "@/utils/request.js"

async function orderadd(params,idstr,token){
	return await request("/api/orderadd",{params:params,idstr:idstr},"GET",{
		authorization:token
	})
}
export {orderadd}