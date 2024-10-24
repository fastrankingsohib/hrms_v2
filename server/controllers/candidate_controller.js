import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import validator from 'validator';


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

  return null; 
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
      work_tenure,
      user_reporting_to
    } = req.body;

    const files = req.files || {};

    const candidate_image = files['candidate_image']?.[0]?.path || null;
    const candidate_resume = files['candidate_resume']?.[0]?.path || null;
    const candidate_aadhar = files['candidate_aadhar']?.[0]?.path || null;
    const candidate_pan = files['candidate_pan']?.[0]?.path || null;
    const candidate_highest_qualification = files['candidate_highest_qualification']?.[0]?.path || null;

    console.log('Resume path:', candidate_resume);
    console.log('Aadhar path:', candidate_aadhar);
    console.log('PAN path:', candidate_pan);
    console.log('Qualification path:', candidate_highest_qualification);

    if (!validator.isEmail(email_address)) {
      return res.status(400).send({ message: 'Invalid email format.' });
    }

    if (!validator.isMobilePhone(contact_number, 'any', { strictMode: false })) {
      return res.status(400).send({ message: 'Invalid mobile number.' });
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
        candidate_image,
        candidate_resume,
        candidate_aadhar,
        candidate_pan,
        candidate_highest_qualification,
        work_tenure,
        user_reporting_to
      },
    });

    const candidate_id = candidate.candidate_id; // Get the created candidate_id

    // Log the candidate_id for debugging purposes (optional)
    console.log('Candidate ID:', candidate_id);

    // Handle experiences
    if (Array.isArray(experiences) && experiences.length > 0) {
      const experienceData = experiences.map((exp) => ({
        candidate_id: candidate_id,
        organisation_name: exp.organisation_name,
        total_tenure_years: exp.total_tenure_years || null,
        total_tenure_months: exp.total_tenure_months || null,
        last_designation: exp.last_designation || null,
        last_drawn_salary: exp.last_drawn_salary || null,
      }));

      await prisma.work_experience.createMany({
        data: experienceData,
      });
    }

    // Handle qualifications
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

    // Handle job applications
    if (Array.isArray(jobs) && jobs.length > 0) {
      const jobData = jobs.map((jobId) => ({
        candidate_id: candidate_id,
        job_id: jobId,
      }));

      await prisma.candidate_applied_jobs.createMany({
        data: jobData,
      });
    }

    // Respond with candidate_id included
    return res.status(200).json({
      success: true,
      message: 'Candidate and related data successfully added.',
      candidate_id: candidate_id,  // Include the candidate_id in the response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error adding candidate.' });
  }
};





// const reporting_to_users = async(req, res) => {
//   try {
//     const reporting_to = await prisma.user.findMany({
//       where: {
//         role: 'Team Lead'
//       },
//       select: {
//         username: true
//       }
//     })
//     res.status(200).send({
//      message: 'Reporting to users fetched successfully',
//      success: true,
//      report_users: reporting_to
//     })
//   } catch (error) {
//    res.status(500).send({
//      message: "cannot send reporting to list"
//    })
//   }
// }

const all_candidates = async (req, res) => {
  try {
    const candidates = await prisma.candidate_list.findMany({
      include: {
        workExperiences: true,
        qualifications: true,
        candidate_applied_jobs: {
          include: {
            job: {
              select: {
                job_title: true,
              },
            },
          },
        },
      },
    });

    const candidatesWithExperience = candidates.map(candidate => {
      let totalTenureMonths = candidate.workExperiences.reduce((acc, experience) => {
        const tenureYears = parseInt(experience.total_tenure_years || 0, 10);
        const tenureMonths = parseInt(experience.total_tenure_months || 0, 10);
        return acc + (tenureYears * 12) + tenureMonths;
      }, 0);

      const experience_years = Math.floor(totalTenureMonths / 12);
      const experience_months = totalTenureMonths % 12;

      return {
        ...candidate,
        experience_years,   
        experience_months,  
      };
    });

    res.status(200).send({
      message: 'Candidates fetched successfully',
      success: true,
      candidates: candidatesWithExperience,
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};



const my_candidates = async (req, res) => {
  try {
    const { created_by } = req.body; 

    if (!created_by) {
      return res.status(400).json({
        message: "'created_by' field is required",
        success: false,
      });
    }

    const candidates = await prisma.candidate_list.findMany({
      where: {
        created_by: created_by,  
      },
      include: {
        workExperiences: true,
        qualifications: true,
      },
    });

    // Return success response
    res.status(200).send({
      message: 'Candidates fetched successfully',
      success: true,
      candidates: candidates,
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
const delete_candidate = async (req, res) => {
  const candidate_id = Number(req.params.id);

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.qualifications.deleteMany({
        where: {
          candidate_id: candidate_id,
        },
      });

      
      await prisma.work_experience.deleteMany({
        where: {
          candidate_id: candidate_id,
        },
      });

      await prisma.candidate_applied_jobs.deleteMany({
        where: {
          candidate_id: candidate_id,
        },
      });

      await prisma.candidate_list.delete({
        where: {
          candidate_id: candidate_id,
        },
      });
    });

    res.status(200).send({
      message: 'Candidate deleted successfully',
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error deleting candidate',
    });
  }
};


const send_data_by_id = async (req, res) => {
  try {
    const candidate_id = Number(req.params.id);

    const candidate = await prisma.candidate_list.findUnique({
      where: {
        candidate_id: candidate_id,
      },
      include: {
        workExperiences: true, 
        qualifications: true, 
        candidate_applied_jobs: {
          include: {
            job: { 
              select: {
                job_title: true,
              },
            },
          },
        },
      },
    });

    if (!candidate) {
      return res.status(404).send({
        success: false,
        message: "Candidate not found",
      });
    }

    // Calculate total tenure in months from all work experiences
    let totalTenureMonths = candidate.workExperiences.reduce((acc, experience) => {
      const tenureYears = parseInt(experience.total_tenure_years || 0, 10);
      const tenureMonths = parseInt(experience.total_tenure_months || 0, 10);
      return acc + (tenureYears * 12) + tenureMonths;
    }, 0);

    // Convert total months into years and months
    const experience_years = Math.floor(totalTenureMonths / 12);
    const experience_months = totalTenureMonths % 12;

    res.status(200).send({
      success: true,
      message: "Data successfully retrieved",
      candidate: candidate,
      experience_years: experience_years,   // Total experience in years
      experience_months: experience_months  // Remaining months
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
    const files = req.files || {};

    const candidate_image = files['candidate_image']?.[0]?.path || null;
    const candidate_resume = files['candidate_resume']?.[0]?.path || null;
    const candidate_aadhar = files['candidate_aadhar']?.[0]?.path || null;
    const candidate_pan = files['candidate_pan']?.[0]?.path || null;
    const candidate_highest_qualification = files['candidate_highest_qualification']?.[0]?.path || null;

    // Update candidate details
    await prisma.candidate_list.update({
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
        current_status,
        candidate_image,
        candidate_resume,
        candidate_aadhar,
        candidate_pan,
        candidate_highest_qualification,
      },
    });

    // Update experiences only if provided
    if (Array.isArray(experiences) && experiences.length > 0) {
      await prisma.work_experience.deleteMany({
        where: {
          candidate_id: candidateId,
        },
      });

      const experienceData = experiences.map((exp) => ({
        candidate_id: candidateId,
        organisation_name: exp.organisation_name,
        total_tenure_years: exp.total_tenure_years || null,
        total_tenure_months: exp.total_tenure_months || null,
        last_designation: exp.last_designation || null,
        last_drawn_salary: exp.last_drawn_salary || null,
      }));

      await prisma.work_experience.createMany({
        data: experienceData,
      });
    }

    // Update qualifications only if provided
    if (Array.isArray(qualifications) && qualifications.length > 0) {
      await prisma.qualifications.deleteMany({
        where: {
          candidate_id: candidateId,
        },
      });

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

    // Update jobs only if provided
    if (Array.isArray(jobs) && jobs.length > 0) {
      await prisma.candidate_applied_jobs.deleteMany({
        where: {
          candidate_id: candidateId,
        },
      });

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


const id_based_jobs_applicants = async(req,res) =>{
  try {
    const job_id = req.params.id;
    const user_id = req.params.user_id
    const user_data = await prisma.user.findUnique({
      where:{
        id:parseInt(user_id)
      }
    })
    const data = await prisma.candidate_applied_jobs.findMany({
      where: {
        job_id: Number(job_id),
        OR: [
          { candidate: { created_by: user_data.username } },
          { candidate: { user_reporting_to: user_data.username } }
        ]
      },
      include: {
        candidate: true, 
      },
    });
  res.status(200).send({
    success: true,
    message: "job applicants successfully sent",
    data:data
  })    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"cannot fetch applicants data"
    })
  }
}

const candidate_applied_based_jobs = async(req,res) =>{
  try {
    const candidate_id = req.params.id;
    const data = await prisma.candidate_applied_jobs.findMany({
      where: {
        candidate_id: Number(candidate_id),
      },
      include: {
        job: true,
      },
    });
  res.status(200).send({
    success: true,
    message: "job applicants successfully sent",
    data:data
  })    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"cannot fetch applicants data"
    })
  }
}

const update_candidate_status = async (req, res) => {
  const candidateId = parseInt(req.params.id);

  try {
    const { status, current_status } = req.body;
    await prisma.candidate_list.update({
      where: {
        candidate_id: candidateId, // Specify the candidate by ID
      },
      data: {
        status,
        current_status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Candidate status and current status updated successfully.",
      candidate_id: candidateId,
    });
  } catch (error) {
    console.error(error); // Log any errors

    return res.status(500).json({
      success: false,
      message: "Error occurred while updating candidate status.",
    });
  }
};

const specific_job_status_update = async (req, res) => {
  const jobId = parseInt(req.params.job_id); 
  const candidateId = parseInt(req.params.candidate_id);

  try {
    const { job_candidate_status } = req.body;
    if (!job_candidate_status) {
      return res.status(400).json({
        success: false,
        message: "Job candidate status is required.",
      });
    }

    const updatedRecord = await prisma.candidate_applied_jobs.updateMany({
      where: {
        job_id: jobId,
        candidate_id: candidateId,
      },
      data: {
        job_candidate_status: job_candidate_status, 
      },
    });

    if (updatedRecord.count === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching job and candidate found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job candidate status updated successfully.",
    });

  } catch (error) {
    console.error(error); 

    return res.status(500).json({
      success: false,
      message: "An error occurred while updating job candidate status.",
    });
  }
};

const add_job_application = async (req, res) => {
  const { job_ids, candidate_id } = req.body;

  try {
    const length = job_ids.length;

    await prisma.$transaction(async (prisma) => {
      await prisma.candidate_applied_jobs.deleteMany({
        where: {
          candidate_id: candidate_id,
        },
      });

      for (let i = 0; i < length; i++) {
        const job_id = job_ids[i];
        await prisma.candidate_applied_jobs.create({
          data: {
            job_id: job_id,
            candidate_id: candidate_id,
          },
        });
      }
    });

    res.status(200).send({
      success: true,
      message: "Job application added successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error with request",
      success: false,
    });
  }
};

const hierarchical_candidates_list = async (req, res) => {
  const id = req.params.id;
  try {
    const user_data = await prisma.user.findUnique({
      where: {
        id: parseInt(id) 
      }
    });

    if (!user_data) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    const candidate_data = await prisma.candidate_list.findMany({
      where: {
        OR: [
          { created_by: user_data.username },
          { user_reporting_to: user_data.username }
        ]
      },
       include: {
        workExperiences: true, 
        qualifications: true, 
        candidate_applied_jobs: {
          include: {
            job: { 
              select: {
                job_title: true,
              },
            },
          },
        },
      }
    });

    res.status(200).send({
      success: true,
      message: "Candidates list",
      candidates: candidate_data
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error sending candidates list"
    });
  }
};


export {add_candidate,all_candidates, my_candidates,delete_candidate,send_data_by_id, update_candidate,module_data,id_based_jobs_applicants, update_candidate_status, specific_job_status_update, candidate_applied_based_jobs,add_job_application,hierarchical_candidates_list}
// reporting_to_users,