-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "contact_number" TEXT,
    "user_role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Lead_Data" (
    "lead_id" SERIAL NOT NULL,
    "lead_number" TEXT NOT NULL,
    "applicant_firstname" TEXT,
    "applicant_lastname" TEXT,
    "applicant_number" TEXT,
    "applicant_number2" TEXT,
    "applicant_address1" TEXT,
    "applicant_address2" TEXT,
    "district" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "status" TEXT DEFAULT 'generated',
    "generated_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Lead_Data_pkey" PRIMARY KEY ("lead_id")
);

-- CreateTable
CREATE TABLE "Document_Data" (
    "document_id" SERIAL NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_path" TEXT NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Document_Data_pkey" PRIMARY KEY ("document_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_Data_lead_number_key" ON "Lead_Data"("lead_number");

-- AddForeignKey
ALTER TABLE "Lead_Data" ADD CONSTRAINT "Lead_Data_generated_by_id_fkey" FOREIGN KEY ("generated_by_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document_Data" ADD CONSTRAINT "Document_Data_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead_Data"("lead_id") ON DELETE RESTRICT ON UPDATE CASCADE;
