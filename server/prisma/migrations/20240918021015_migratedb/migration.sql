-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "middle_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "gender" VARCHAR(20),
    "dob" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(20) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "date_of_joining" VARCHAR(100) NOT NULL,
    "employee_id" VARCHAR(100) NOT NULL,
    "designation" VARCHAR(100) NOT NULL,
    "teams" VARCHAR(100) NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "department" VARCHAR(100) NOT NULL,
    "user_type" VARCHAR(100) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "reporting_to" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_mobile_key" ON "user"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
