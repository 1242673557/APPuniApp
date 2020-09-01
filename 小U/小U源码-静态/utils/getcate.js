import {request} from "@/utils/request.js"
async function getcate(){
	return await request ("/api/getcate")
}
export {getcate}

