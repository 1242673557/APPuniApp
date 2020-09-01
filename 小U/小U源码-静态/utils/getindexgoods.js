import {request} from "@/utils/request.js"
async function getindexgoods(){
	return await request ("/api/getindexgoods")
}
export {getindexgoods}



