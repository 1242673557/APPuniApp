import {request} from "@/utils/request.js"


async function cartedit(id,num,checked,token){
	return await request ("/api/cartedit",{id,num,checked},"GET",{
		authorization:token
	})
}
export {cartedit}