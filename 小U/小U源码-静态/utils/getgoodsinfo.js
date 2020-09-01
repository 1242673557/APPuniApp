import {request} from "@/utils/request.js"
async function getgoodsinfo(data={}){
	return await request ("/api/getgoodsinfo",data)
}
export {getgoodsinfo}