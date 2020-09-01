import {request} from '@/utils/request.js'

async function getbanner(){
	return await request ("/api/getbanner")
}
export {getbanner}