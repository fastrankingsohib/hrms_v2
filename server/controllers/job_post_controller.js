import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const post_jobs = async (req, res) => {
    try {
        const {
            job_title,
            job_type,
            job_desc,
            experience,
            job_location,
            number_of_opening,
            interview_timing,
            job_timing,
            required_qualification,
            min_offered_salary,
            max_offered_salary,
            job_shift,
            genders,
            min_experience,
            max_experience,
            created_by,
            job_status,
            job_exp_date,
            job_scheduled_date,
            skills,
            job_scheduled_time
        } = req.body;

        // Check if file was uploaded and set file_path accordingly
        const file_path = req.file ? req.file.path : null;

        // Insert job post into the database with file_path (can be null if no file)
        await prisma.job_post.create({
            data: {
                job_title,
                job_type,
                job_location,
                number_of_opening,
                interview_timing,
                job_timing,
                required_qualification,
                skills,
                min_offered_salary,
                max_offered_salary,
                job_shift,
                genders,
                job_desc,
                experience,
                min_experience,
                max_experience,
                created_by,
                job_status,
                job_exp_date,
                job_scheduled_date,
                job_scheduled_time,
                job_pdf_file_path: file_path // File path or null
            }
        });

        // Send success response
        res.status(200).send({
            success: true,
            message: "Job posted successfully",
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({
            success: false,
            message: "Error creating job post",
            error: error.message // Include the error message for better debugging
        });
    }
};

const display_posted_jobs = async (req,res) =>{
    try {
        const jobs = await prisma.job_post.findMany({
            orderBy: {
              id: 'desc',
            }
          });
          
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
        const job = await prisma.job_post.findMany({where:{id:Number(id)}})
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
        const { job_title, job_type, job_desc, experience, job_location, number_of_opening, interview_timing, job_timing, required_qualification, min_offered_salary,
            max_offered_salary, job_shift, genders, min_experience, max_experience, created_by, job_status, job_exp_date, job_scheduled_date,skills,job_scheduled_time
         } = req.body;

        await prisma.job_post.update({where:{id:Number(id)}, data: {
            job_title: job_title,
                job_type: job_type,
                job_location: job_location,
                number_of_opening: number_of_opening,
                interview_timing: interview_timing,
                job_timing: job_timing,
                required_qualification: required_qualification,
                skills: skills,
                min_offered_salary: min_offered_salary,
                max_offered_salary: max_offered_salary,
                job_shift: job_shift,
                genders: genders,
                job_desc: job_desc,
                experience: experience,
                min_experience: min_experience,
                max_experience: max_experience,
                created_by: created_by,
                job_status: job_status,
                job_exp_date: job_exp_date,
                job_scheduled_date: job_scheduled_date,
                job_scheduled_time:job_scheduled_time
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

const latest_created_job = async(req,res) =>{
    try {
        const job = await prisma.job_post.findMany({
            orderBy: {
              id: 'desc',
            },
            take: 1,
          })
          res.status(200).send({
            success: true,
            data: job
          })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error fetching latest created job"
        })
    }
}
export {display_posted_jobs,post_jobs,id_based_jobs,update_post_job,delete_posts,latest_created_job}