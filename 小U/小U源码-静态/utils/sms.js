import {request} from "@/utils/request.js"

async function sms(){
	return await request ("/api/sms")
}
export {sms}
