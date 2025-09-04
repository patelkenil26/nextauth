import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect()

export async function POST(request:NextRequest){

    const userId = await getDataFromToken(request);

    const user = await User.findOne({_id:userId}).select("-password")
    
    return  NextResponse.json({
        message:"User Found",
        data:user
    })
}