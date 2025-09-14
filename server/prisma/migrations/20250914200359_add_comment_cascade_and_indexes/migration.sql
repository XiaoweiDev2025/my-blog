/*
  Warnings:

  - You are about to alter the column `author` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" ALTER COLUMN "author" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE INDEX "Comment_articleId_createdAt_idx" ON "public"."Comment"("articleId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "public"."Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
