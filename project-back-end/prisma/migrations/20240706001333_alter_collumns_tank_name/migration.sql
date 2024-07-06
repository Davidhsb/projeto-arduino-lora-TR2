/*
  Warnings:

  - You are about to drop the column `capacity` on the `tanks` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tanks` table. All the data in the column will be lost.
  - Added the required column `area` to the `tanks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tanks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "area" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_tanks" ("createdAt", "description", "id", "location", "name", "updatedAt") SELECT "createdAt", "description", "id", "location", "name", "updatedAt" FROM "tanks";
DROP TABLE "tanks";
ALTER TABLE "new_tanks" RENAME TO "tanks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
