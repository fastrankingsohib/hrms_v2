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

        const file_path = req.file ? req.file.path : null;

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
                job_pdf_file_path: file_path 
            }
        });

       
        res.status(200).send({
            success: true,
            message: "Job posted successfully",
        });
    } catch (error) {
        console.error(error); 
        res.status(500).send({
            success: false,
            message: "Error creating job post",
            error: error.message 
        });
    }
};

const display_posted_jobs = async (req, res) => {
    try {
      const currentDate = new Date().toISOString().slice(0, 10);  // Get current date in YYYY-MM-DD format
  
      // Start transaction
      const [jobs, updateScheduleActive, updateJobExpiry] = await prisma.$transaction([
        // Fetch jobs ordered by descending ID
        prisma.job_post.findMany({
          orderBy: {
            id: 'desc',
          },
        }),
        
        // Update job status to "Active" for jobs with a scheduled date/time in the future
        prisma.job_post.updateMany({
          where: {
            job_scheduled_date: {
              gt: currentDate,  // Compare only date
            },
            job_scheduled_time: {
              gt: currentDate,  // Compare only date
            },
          },
          data: {
            job_status: "Active",
          },
        }),
  
        // Update job status to "Inactive" for jobs with an expired date
        prisma.job_post.updateMany({
          where: {
            job_exp_date: {
              lt: currentDate,  // Expired jobs (less than current date)
            },
          },
          data: {
            job_status: "Inactive",
          },
        }),
      ]);
  
      if (jobs.length === 0) {
        return res.status(404).send({
          message: "No jobs posted yet",
        });
      }
  
      // Return success response with the fetched jobs
      res.status(200).send({
        success: true,
        message: "Successfully fetched posted jobs",
        jobs: jobs,
      });
  
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).send({
        success: false,
        message: "Error fetching jobs",
      });
    }
  };
  

const active_job_posts = async(req,res) =>{
    try {
        const data = await prisma.job_post.findMany({
            where:{
                job_status: "Active"
            },
            orderBy:{
                id: 'desc'
            }
        })
        res.status(200).send({
            success:true,
            message: "successfully fetched active jobs",
            jobs: data
        })
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching active job posts",
        })
    }
}
const inactive_job_posts = async(req,res)=>{
    try {
        const data = await prisma.job_post.findMany({
            where:{
                job_status: "Inactive"
            },
            orderBy:{
                id: 'desc'
            }
        })
        res.status(200).send({
            success:true,
            message: "successfully fetched inactive jobs",
            jobs: data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching inactive job posts",
        })
    }
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


export {display_posted_jobs,post_jobs,id_based_jobs,update_post_job,delete_posts,latest_created_job,active_job_posts,inactive_job_posts}