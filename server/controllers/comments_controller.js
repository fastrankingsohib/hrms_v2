import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const add_comment = async(req,res)=>{
try {
        const {created_by,candidate_id,comment} = req.body;
        await prisma.comments.create({
            data:{
                created_by:created_by,
                candidate_id:parseInt(candidate_id),
                comment:comment
            }
        })
        res.status(200).send({
            message:"Comment Added Successfully",
            success:true
        })
} catch (error) {
    console.log(error)
    res.status(500).send({
        message: "Error Occured",
        success:false
    })
}

}
const display_comment = async(req,res)=>{
 try {
       const id = req.params.id
       const data = await prisma.comments.findMany({
           where:{
               candidate_id:parseInt(id)
           }
       })
   
       res.status(200).send({
           data:data,
           success:true,
           message:"comments successfully sent"
       })
 } catch (error) {
    console.log(error),
    res.status(500).send({
        message: "Error Occured",
        success:false
    })
 }
}

const delete_comment = async(req,res)=>{
try {
        const id = req.params.id
        await prisma.comments.delete({
            where:{
                comment_id:parseInt(id)
            }
        })
        res.status(200).send({
            success:true,
            message:"Comment Deleted Successfully"
        })
    } 

 catch (error) {
    console.log(error)
    res.status(200).send({
        success:false,
        message:"cannot delete comment"
    })
    
}
}

export {add_comment,display_comment,delete_comment}
