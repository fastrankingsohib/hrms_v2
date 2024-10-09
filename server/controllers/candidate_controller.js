import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import validator from 'validator';


// Check if email or contact number already exists
const check_email_contact = async (req, res) => {
  const { email_address, contact_number } = req.body;

  const candidate_chk = await prisma.candidate_list.findUnique({
    where: {
      email_address: email_address,
    },
  });

  const candidate_chk_2 = await prisma.candidate_list.findUnique({
    where: {
      contact_number: contact_number,
    },
  });

  if (candidate_chk_2) {
    return res.status(400).send({
      message: "Contact Number already exists",
    });
  }

  if (candidate_chk) {
    return res.status(400).send({
      message: "User with email already exists",
    });
  }

  return null; // If both checks pass, return null
};

const add_candidate = async (req, res) => {
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
      jobs, 
      created_by,
    } = req.body;

    
    if (!validator.isEmail(email_address)) {
      return res.status(400).send({ message: "Invalid email format." });
    }

    if (!validator.isMobilePhone(contact_number, 'any', { strictMode: false })) {
      return res.status(400).send({ message: "Invalid mobile number." });
    }

    
    const emailOrContactCheck = await check_email_contact(req, res);
    if (emailOrContactCheck) return; 

    
    const candidate = await prisma.candidate_list.create({
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
        created_by,
      },
    });

    const candidate_id = candidate.candidate_id;

    
    if (!Array.isArray(experiences) || experiences.length === 0) {
      throw new Error("Experience data is required and must be an array.");
    }

    const experienceData = experiences.map((exp) => ({
      candidate_id: candidate_id,
      organisation_name: exp.organisation_name,
      total_tenure: exp.total_tenure || null,
      last_designation: exp.last_designation || null,
      last_drawn_salary: exp.last_drawn_salary || null,
    }));

    
    await prisma.work_experience.createMany({
      data: experienceData,
    });

   
    if (Array.isArray(qualifications) && qualifications.length > 0) {
      const qualificationData = qualifications.map((qual) => ({
        candidate_id: candidate_id,
        course: qual.course,
        college_university: qual.college_university,
        year_of_passing: qual.year_of_passing,
        percentage_cgpa: qual.percentage_cgpa || null,
      }));
    
      await prisma.qualifications.createMany({
        data: qualificationData,
      });
    }

    if (Array.isArray(jobs) && jobs.length > 0) {
      const jobData = jobs.map((jobId) => ({
        candidate_id: candidate_id,
        job_id: jobId, 
      }));

      await prisma.candidate_applied_jobs.createMany({
        data: jobData,
      });
    }

  
    return res.status(200).json({
      success: true,
      message: "Candidate, experiences, qualifications, and jobs added successfully.",
      candidate_id: candidate_id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Some error occurred while adding candidate, experiences, qualifications, and jobs.",
    });
  }
};

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
    
    const candidates = await prisma.candidate_list.findMany({
      include: {
        workExperiences: true, 
        qualifications: true,  
        candidate_applied_jobs: {
          include: {
            job: { // Include the related job_post to retrieve job_title
              select: {
                job_title: true, // Retrieve job_title from the job_post
              },
            },
          },
        },
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

const my_candidates = async (req, res) => {
  try {
    const candidates = await prisma.candidate_list.findMany({
      where: {
        created_by : 'Sohib'

      },
      include: {
        workExperiences: true,  
        qualifications: true,   
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

const send_data_by_id = async (req, res) => {
  try {
    const candidate_id = Number(req.params.id); // Ensure candidate_id is a number

    // Fetch candidate data including work experiences, qualifications, and applied jobs with job titles
    const candidate = await prisma.candidate_list.findUnique({
      where: {
        candidate_id: candidate_id,
      },
      include: {
        workExperiences: true, // Include work experiences
        qualifications: true, // Include qualifications
        candidate_applied_jobs: {
          include: {
            job: { // Include the related job_post to retrieve job_title
              select: {
                job_title: true, // Retrieve job_title from the job_post
              },
            },
          },
        },
      },
    });

    // Check if candidate data exists
    if (!candidate) {
      return res.status(404).send({
        success: false,
        message: "Candidate not found",
      });
    }

    // Send the candidate data with the job titles
    res.status(200).send({
      success: true,
      message: "Data successfully retrieved",
      candidate: candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error sending data",
    });
  }
};



const update_candidate = async (req, res) => {
  const candidateId = parseInt(req.params.id); 

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
      current_status,
      qualifications,
      experiences,
      jobs 
    } = req.body;

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
        current_status
      },
    });

    await prisma.work_experience.deleteMany({
      where: {
        candidate_id: candidateId,
      },
    });

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

    await prisma.qualifications.deleteMany({
      where: {
        candidate_id: candidateId,
      },
    });

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

    await prisma.candidate_applied_jobs.deleteMany({
      where: {
        candidate_id: candidateId,
      },
    });

    if (Array.isArray(jobs) && jobs.length > 0) {
      const jobData = jobs.map((jobId) => ({
        candidate_id: candidateId,
        job_id: jobId, 
      }));

      await prisma.candidate_applied_jobs.createMany({
        data: jobData,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Candidate, experiences, qualifications, and job titles updated successfully.",
      candidate_id: candidateId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Some error occurred while updating candidate, experiences, qualifications, and job titles.",
    });
  }
};


const module_data = async(req,res)=>{
  try {
    const modules = await prisma.modules.findMany()
    return res.status(200).send({
      success:true,
      message:"user data by id sent",
      modules:modules
    })
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Some error occurred while fetching module data.",
    })
  }
}





export {add_candidate,reporting_to_users,all_candidates, my_candidates,delete_candidate,send_data_by_id, update_candidate,module_data}