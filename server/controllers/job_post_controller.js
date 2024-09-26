import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const post_jobs = async(req,res)=>{
    try {
        const { job_title, job_type, job_desc, experience, salary } = req.body;
    
        await prisma.job_post.create({
            data: {
                job_title: job_title,
                job_type: job_type,
                job_desc: job_desc,
                experience: experience,
                salary: salary
            }
        })

        res.status(200).send({
            success:true,
            message: "Job posted successfully",
        })
    } catch (error) {
        res.status(500).send({
            message: "Error creating job post",
        })
    }


}

const display_posted_jobs = async (req,res) =>{
    try {
        const jobs = await prisma.job_post.findMany()
        if(jobs.length==0){
            res.status(404).send({
                message: "No jobs posted yet",
            })
        }
        res.status(200).send({
            success:true,
            message:"successfully fetched posted jobs",
            jobs: jobs
        })

    }
    catch(error){
        res.status(500).send({
            success:false,
            message: "Error fetching jobs",
        })
    };
    
}

const id_based_jobs = async(req,res)=>{
    try{
        const id = req.params.id;
        const job = await prisma.job_post.findUnique({where:{id:Number(id)}})
        res.status(200).send({
            success:true,
            message: "Job fetched successfully",
            job: job
        })
        
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"error fetching specific job data"
        })
    }
}

const update_post_job = async (req,res)=>{
    
    try{
        
        const id = req.params.id;
        const { job_title, job_type, job_desc, experience, salary } = req.body;

        await prisma.job_post.update({where:{id:Number(id)}, data: {
            job_title: job_title,
            job_type: job_type,
            job_desc: job_desc,
            experience: experience,
            salary: salary
        }})
        res.status(200).send({
            success:true,
            message:"job successfully updated"
        })
    }
    catch (error) {
        res.status(500).send({
            success:false,
            message: "Error updating job"
        })
    }
}

const delete_posts = async(req,res)=>{
    try {
        const id = req.params.id
        await prisma.job_post.delete({where:{id:Number(id)}})
        res.status(200).send({
            success:true,
            message: "Job deleted successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error deleting posts"
        })
    }
}

export {display_posted_jobs,post_jobs,id_based_jobs,update_post_job,delete_posts}