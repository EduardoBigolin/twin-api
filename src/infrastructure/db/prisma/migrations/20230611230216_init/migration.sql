/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Cart_Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cart_Item_productId_key" ON "Cart_Item"("productId");
