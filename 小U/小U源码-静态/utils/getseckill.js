import {request} from "@/utils/request.js"

async function getseckill(){
	return await request ("/api/getseckill")
}
export {getseckill}
