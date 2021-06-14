/*
  Warnings:

  - Added the required column `specNameId` to the `Spec` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spec" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT,
    "productId" INTEGER NOT NULL,
    "specNameId" INTEGER NOT NULL,
    FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("specNameId") REFERENCES "SpecName" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Spec" ("id", "productId", "value") SELECT "id", "productId", "value" FROM "Spec";
DROP TABLE "Spec";
ALTER TABLE "new_Spec" RENAME TO "Spec";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
