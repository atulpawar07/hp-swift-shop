# Product Images Setup Instructions

## Overview
Your product catalog has been updated with real data from your Excel file. All products are now organized by brands:
- **APC** (UPS & Batteries) - 25 products
- **HP** (Printers & Scanners) - 16 products
- **CANON** (Printers) - 12 products
- **Epson** (Printers) - 13 products
- **Brother** (Printers) - 6 products

**Total: 72 products**

## Image Organization Required

Since the ZIP file cannot be automatically extracted, please follow these steps:

### 1. Extract the ZIP file
Extract `nycom_images.zip` to get the product images.

### 2. Create Brand Folders
Create the following folder structure in your `public/products/` directory:

```
public/
└── products/
    ├── apc/
    ├── hp/
    ├── canon/
    ├── epson/
    └── brother/
```

### 3. Organize Images by Brand

Move images from the extracted ZIP to the appropriate brand folders:

#### APC Products (from `product-category_apc-ups-and-batteries/`)
Move all APC product images to `public/products/apc/`

#### HP Products (from `product-category_printer_hp-printers/`)
Move all HP product images to `public/products/hp/`

#### Canon Products (from `product-category_printer_canon/`)
Move all Canon product images to `public/products/canon/`

#### Epson Products (from `product-category_printer_epson-printers/`)
Move all Epson product images to `public/products/epson/`

#### Brother Products (from `product-category_printer_brothers-printers/`)
Move all Brother product images to `public/products/brother/`

### 4. Image Naming
Keep the original filenames as they are referenced in the code. For example:
- `Ap9544_APC-SMC1000I1500.jpg`
- `HP_CP5225n_Untitled-design-10.jpg`
- `CANON_I-SENSYS_MF-237W.webp`

### 5. Features Enabled

The Products page now includes:
- ✅ **Brand filtering** (APC, HP, CANON, Epson, Brother)
- ✅ **Category filtering** (UPS & Batteries, Printers, Scanners)
- ✅ **Search functionality** (by product name)
- ✅ **Price range slider** (AED 0 - 3000)
- ✅ **Sorting** (Relevance, Price Low-High, Price High-Low, Name A-Z)
- ✅ **Responsive design** (Mobile filters toggle)
- ✅ **Product count display**
- ✅ **Clear filters button**

### 6. Verify Setup

After organizing the images:
1. Navigate to the Products page
2. Check if product images are loading correctly
3. Test filtering by brand and category
4. Test the search functionality

## Alternative: Using Image URLs

If you prefer, you can also update the `src/data/productsData.ts` file to use direct URLs from your current website instead of local paths. Simply replace the image paths with full URLs like:
```typescript
images: ["https://nycomtrading.com/wp-content/uploads/2025/08/APC-SMC1000I1500.jpg"]
```

This way, images will load from your existing site without needing to upload them locally.
