import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const create_interview = async(req,res)=>{
    try {
        const {
            job_id,
            candidate_id,
            interview_date,
            interview_time,
            interviewer
            }= req.body;

            const data = await prisma.interview_details.count({
                where: {
                    job_id: job_id,
                    candidate_id:candidate_id
                }
            })
            const interview_round = `${data+1}`;



        await prisma.interview_details.create({
            data:{
                job_id:job_id,
                candidate_id:candidate_id,
                interview_date:interview_date,
                interview_time:interview_time,
                interviewer:interviewer,
                interview_round:interview_round,
                }
        })
        res.status(200).send({
            success:true,
            message:"Interview created successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"could not create interview"
        })
    }
}

// const my_interviews = async(req,res)=>{
//     try {
//         const {interviewer} = req.body
//         const my_interview = await prisma.interview_details.findMany({
//             where:{
//                 interviewer:interviewer
//             }
//         })
//         res.status(200).send({
//             success:true,
//             data:my_interview,
//             message : "my interviews sent successfully"
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"could not fetch interviews"
//         })
//     }
// }

const all_interviews = async(req,res)=>{
    try {
       
        const all_interview = await prisma.interview_details.findMany()
        res.status(200).send({
            success:true,
            data:all_interview,
            message : "my interviews sent successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"could not fetch interviews"
        })
    }
}

const interview_of_candidate = async(req,res)=>{
    try {
        const {candidate_id}= req.params.id
        const data = await prisma.interview_details.findMany({
            where:{
                candidate_id:candidate_id
            }
        })
        res.status(200).send({
            success:true,
            data:data,
            message : "interview of candidates sent successfully"
        })        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"could not fetch interviews of candidate"
        })
    }
}

const update_interview = async(req,res)=>{
    try {
        
        const {
            
            interview_date,
            interview_time,
            interviewer,
            interview_round,
            }= req.body;
            const interview_id = parseInt(req.params.id);

            await prisma.interview_details.update({
                where: {
                    id:interview_id
                },
                data:{
                    
                    interview_date:interview_date,
                    interview_time:interview_time,
                    interview_round:interview_round,
                    interviewer:interviewer
                }
            })
            res.status(200).send({
                success:true,
                message:"interview successfully updated."
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"cannot update interveiw details"
        })
    }
}

const update_interview_status = async(req,res)=>{
    try {
        const {candidate_id , job_id , job_candidate_status , attempted , remarks} = req.body;
        const interview_id = parseInt(req.params.id)
        await prisma.interview_details.update({
            where: {
                id:interview_id
            },
            data:{
                attempted:attempted,
                remarks:remarks
            }
        })
        await prisma.candidate_applied_jobs.updateMany({
            where:{
                candidate_id:candidate_id,
                job_id:job_id
            },
            data:{
                job__candidate_status:job_candidate_status
            }
        })
        res.status(200).send({
            success:true,
            message:"Interview status updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "could not update interview status"

        })
        
    }
}

const delete_interview = async(req,res)=>{
    try {
        const interview_id = req.params.id
        await prisma.interview_details.delete({
            where:{
                id:interview_id
            }
        })
        res.status(200).send({
            success:true,
            message : "interview deleted successfully"
        })
    }
    catch(error){
        console.log(error)

    }
}


export {create_interview , all_interviews , interview_of_candidate , update_interview ,update_interview_status,delete_interview}