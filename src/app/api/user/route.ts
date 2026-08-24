import { NextResponse } from "next/server";


export async function GET(){
    try{
        const userListFE = await fetch("http://localhost:4000/users");
        const data = await userListFE.json();
        return NextResponse.json(data);

    }catch{
         console.log("Error fetching user");
    }
}
