/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Spec` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Spec` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SpecName" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryToSpecName" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "SpecName" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spec" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT,
    "productId" INTEGER NOT NULL,
    FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Spec" ("id", "productId", "value") SELECT "id", "productId", "value" FROM "Spec";
DROP TABLE "Spec";
ALTER TABLE "new_Spec" RENAME TO "Spec";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSpecName_AB_unique" ON "_CategoryToSpecName"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSpecName_B_index" ON "_CategoryToSpecName"("B");
