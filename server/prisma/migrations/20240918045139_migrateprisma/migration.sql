-- AlterTable
ALTER TABLE "user" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "mobile" DROP NOT NULL,
ALTER COLUMN "date_of_joining" DROP NOT NULL,
ALTER COLUMN "employee_id" DROP NOT NULL,
ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "teams" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "user_type" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "reporting_to" DROP NOT NULL;

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "module_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_modulesTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_modulesTouser_AB_unique" ON "_modulesTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_modulesTouser_B_index" ON "_modulesTouser"("B");

-- AddForeignKey
ALTER TABLE "_modulesTouser" ADD CONSTRAINT "_modulesTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_modulesTouser" ADD CONSTRAINT "_modulesTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
