-- CreateTable
CREATE TABLE "Menu" (
    "menuId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("menuId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parentCategoryId" UUID,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "MenuCategory" (
    "menuId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("menuId","categoryId")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("menuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
