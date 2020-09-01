import {request} from "@/utils/request.js"

async function wxlogin(data={}){
	return await request ("/api/wxlogin",data)
}
export {wxlogin}

