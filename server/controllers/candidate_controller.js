import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const add_candidate = async(req,res)=>{
 try {
     const {
         title,
         first_name,
         middle_name,
         last_name,
         address_line1,
         address_line2,
         city,
         state,
         pin_code,
         country,
         contact_number,
         alt_contact_number,
         email_address,
         alt_email_address,
         date_of_birth,
         job_title,
         department,
         work_experience,
         hobbies,
         interests,
         skills,
         recruiter_comments,
         communication_skills,
         other1,
         other2,
         other3,
         status,
         qualifications,
         experiences
       } = req.body;
       const candidate = await prisma.candidate_list.create({
         data: {
             title:title,
             first_name:first_name,
             middle_name:middle_name,
             last_name:last_name,
             address_line1:address_line1,
             address_line2:address_line2,
             city : city,
             state:state,
             pin_code:pin_code,
             country:country,
             contact_number:contact_number,
             alt_contact_number:alt_contact_number,
             email_address:email_address,
             alt_email_address:alt_email_address,
             date_of_birth:date_of_birth,
             job_title:job_title,
             department:department,
             work_experience:work_experience,
             hobbies:hobbies,
             interests:interests,
             skills:skills,
             recruiter_comments:recruiter_comments,
             communication_skills:communication_skills,
             other1:other1,
             other2:other2,
             other3:other3,
             status:status
         }
       })
 
         const candidate_id = candidate.candidate_id
         
     
         if (!Array.isArray(experiences) || experiences.length === 0) {
             throw new Error("Experience data is required and must be an array.");
         }
       
         // Validate and format the data for insertion
         const experienceData = experiences.map(exp => ({
           candidate_id: candidate_id,  // Assuming candidate_id is part of the request body
           organisation_name: exp.organisation_name,
           total_tenure: exp.total_tenure || null,
           last_designation: exp.last_designation || null,
           last_drawn_salary: exp.last_drawn_salary || null
       }));
       
         // Insert experiences into the database
         await prisma.work_experience.createMany({
             data: experienceData
         });
       
         if (Array.isArray(qualifications) && qualifications.length > 0) {
           const qualificationData = qualifications.map(qual => ({
               candidate_id: candidate_id,
               course: qual.course,
               college_university: qual.college_university,
               year_of_passing: qual.year_of_passing,
               percentage_cgpa: qual.percentage_cgpa || null
           }));
   
           await prisma.qualifications.createMany({
               data: qualificationData
           });
       }
 
       // Return a success message
       return res.status(200).json({
           success:true,
           message: "Candidate, experiences, and qualifications added successfully.",
           candidate_id: candidate_id
       });
       
 } catch (error) {
  console.log(error);
  
  res.status(500).send({
    success:false,
    message: "Some error occurred while adding candidate, experiences, and qualifications.",
  })
 }
      
}
const reporting_to_users = async(req, res) => {
  try {
    const reporting_to = await prisma.user.findMany({
      where: {
        role: 'Team Lead'
      },
      select: {
        username: true
      }
    })
    res.status(200).send({
     message: 'Reporting to users fetched successfully',
     success: true,
     report_users: reporting_to
    })
  } catch (error) {
   res.status(500).send({
     message: "cannot send reporting to list"
   })
  }
}

const all_candidates = async (req, res) => {
  try {
    // Fetch all candidates with work experience and qualifications
    const candidates = await prisma.candidate_list.findMany({
      include: {
        workExperiences: true,  // Include related work experiences
        qualifications: true,   // Include related qualifications
      },
    });

    
    res.status(200).send({
      message: 'Candidates fetched successfully',
      success: true,
      candidates: candidates
    })
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      success: false
    });
  }
};

const delete_candidate = async(req,res) =>{
  try {
    const candidate_id = req.params.id;

    await prisma.qualifications.deleteMany({
      where:{
        candidate_id:Number(candidate_id)
      }
    })

    await prisma.work_experience.deleteMany({
      where: {
        candidate_id: Number(candidate_id)
      }
    })

    await prisma.candidate_list.delete({
      where: {
        candidate_id:Number(candidate_id)
      }
    })

    res.status(200).send({
      message: 'Candidate deleted successfully',
      success: true
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message: 'Error deleting candidate'
    })
  }
}

const send_data_by_id =async(req,res) =>{
  try {
    const candidate_id = req.params.id
    const candidate = await prisma.candidate_list.findMany({
      where:{
        candidate_id:Number(candidate_id)
      },
      include: {
        workExperiences: true,  // Include related work experiences
        qualifications: true,   // Include related qualifications
      },
    })
    res.status(200).send({
      success:true,
      message:"data successfully retrieved",
      candidate:candidate
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message: 'Error sending data'
    })
  }
}


const update_candidate = async (req, res) => {
  const candidateId = parseInt(req.params.id); // Get candidate ID from URL params

  try {
    const {
      title,
      first_name,
      middle_name,
      last_name,
      address_line1,
      address_line2,
      city,
      state,
      pin_code,
      country,
      contact_number,
      alt_contact_number,
      email_address,
      alt_email_address,
      date_of_birth,
      job_title,
      department,
      work_experience,
      hobbies,
      interests,
      skills,
      recruiter_comments,
      communication_skills,
      other1,
      other2,
      other3,
      status,
      qualifications,
      experiences,
    } = req.body;

    // Update candidate data
    const updatedCandidate = await prisma.candidate_list.update({
      where: {
        candidate_id: candidateId,
      },
      data: {
        title,
        first_name,
        middle_name,
        last_name,
        address_line1,
        address_line2,
        city,
        state,
        pin_code,
        country,
        contact_number,
        alt_contact_number,
        email_address,
        alt_email_address,
        date_of_birth,
        job_title,
        department,
        work_experience,
        hobbies,
        interests,
        skills,
        recruiter_comments,
        communication_skills,
        other1,
        other2,
        other3,
        status,
      },
    });

    // Delete existing work experiences for the candidate
    await prisma.work_experience.deleteMany({
      where: {
        candidate_id: candidateId,
      },
    });

    // Insert new work experiences
    if (Array.isArray(experiences) && experiences.length > 0) {
      const experienceData = experiences.map((exp) => ({
        candidate_id: candidateId,
        organisation_name: exp.organisation_name,
        total_tenure: exp.total_tenure || null,
        last_designation: exp.last_designation || null,
        last_drawn_salary: exp.last_drawn_salary || null,
      }));

      await prisma.work_experience.createMany({
        data: experienceData,
      });
    }

    // Delete existing qualifications for the candidate
    await prisma.qualifications.deleteMany({
      where: {
        candidate_id: candidateId,
      },
    });

    // Insert new qualifications
    if (Array.isArray(qualifications) && qualifications.length > 0) {
      const qualificationData = qualifications.map((qual) => ({
        candidate_id: candidateId,
        course: qual.course,
        college_university: qual.college_university,
        year_of_passing: qual.year_of_passing,
        percentage_cgpa: qual.percentage_cgpa || null,
      }));

      await prisma.qualifications.createMany({
        data: qualificationData,
      });
    }

    // Return a success message
    return res.status(200).json({
      success: true,
      message: "Candidate, experiences, and qualifications updated successfully.",
      candidate_id: candidateId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Some error occurred while updating candidate, experiences, and qualifications.",
    });
  }
};





export {add_candidate,reporting_to_users,all_candidates, delete_candidate,send_data_by_id, update_candidate}
