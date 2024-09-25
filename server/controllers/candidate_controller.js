import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const add_candidate = async(req,res)=>{
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
        status
      } = req.body;
      const candidate = await prisma.candidate.create({
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
      const candidate_experience =async(req,res)=>{
        const {organisation_name,total_tenure,last_designation,last_drawn_salary}=req.body;
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

export {add_candidate, reporting_to_users}