-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tanks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "area" INTEGER NOT NULL,
    "location" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_tanks" ("area", "createdAt", "description", "id", "is_active", "location", "name", "updatedAt") SELECT "area", "createdAt", "description", "id", "is_active", "location", "name", "updatedAt" FROM "tanks";
DROP TABLE "tanks";
ALTER TABLE "new_tanks" RENAME TO "tanks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
