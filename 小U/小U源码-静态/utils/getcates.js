import {request} from "@/utils/request.js"
async function getcates(){
	return await request ("/api/getcates")
}
export {getcates}