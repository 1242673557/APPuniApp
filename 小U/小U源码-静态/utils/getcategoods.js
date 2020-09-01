import {request} from "@/utils/request.js"
async function getcategoods(data={}){
	return await request ("/api/getcategoods",data)
}
export {getcategoods}

