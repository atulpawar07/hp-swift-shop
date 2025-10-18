// Product data imported from Excel
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price?: number;
  images: string[];
  inStock: boolean;
}

export const productsData: Product[] = [
  // APC Products - UPS and Batteries
  {
    id: "apc-ap9544",
    name: "Ap9544",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/Ap9544_APC-SMC1000I1500.jpg",
      "/products/apc/Ap9544_APC.jpg",
      "/products/apc/Ap9544_oiuy.jpg",
      "/products/apc/Ap9544_download-2.jpg"
    ],
    inStock: true
  },
  {
    id: "apc-ap9640",
    name: "Ap9640",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/Ap9640_download-12-1.jpg"],
    inStock: true
  },
  {
    id: "apc-ap9641",
    name: "Ap9641",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/Ap9641_download-12.jpg"],
    inStock: true
  },
  {
    id: "apc-bv650i-msx",
    name: "APC BV650i-MSX",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/APC_BV650i-MSX_APC-BV650i-MSX.webp",
      "/products/apc/APC_BV650i-MSX_APC.jpg"
    ],
    inStock: true
  },
  {
    id: "apc-bv800i-msx",
    name: "APC BV800i-MSX",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/APC_BV800i-MSX_APC-BV800i-MSX.webp",
      "/products/apc/APC_BV800i-MSX_n1.webp"
    ],
    inStock: true
  },
  {
    id: "apc-bx750mi",
    name: "APC BX750MI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_BX750MI_APC-BX750MI.jpg"],
    inStock: true
  },
  {
    id: "apc-easy-srv1ki",
    name: "APC EASY SRV1KI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_EASY_SRV1KI_APC-EASY-SRV1KI.webp"],
    inStock: true
  },
  {
    id: "apc-easy-srv3krilrk",
    name: "APC EASY SRV3KRILRK",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_EASY_SRV3KRILRK_APC-EASY-SRV3KRILRK.webp"],
    inStock: true
  },
  {
    id: "apc-rbc7",
    name: "APC Replacement Battery Cartridge #7",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_Replacement_Battery_download-7.jpg"],
    inStock: true
  },
  {
    id: "apc-smc1000ic",
    name: "APC SMC1000IC / 1500IC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SMC1000IC_APC-SMC1000I1500.jpg"],
    inStock: true
  },
  {
    id: "apc-smc3000i",
    name: "APC SMC3000I",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SMC3000I_jk.jpg"],
    inStock: true
  },
  {
    id: "apc-smc3000rmi2uc",
    name: "APC SMC3000RMI2UC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SMC3000RMI2UC_ko.webp"],
    inStock: true
  },
  {
    id: "apc-smt1000i-ic",
    name: "APC SMT1000I – IC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SMT1000I_IC_lo.jpg"],
    inStock: true
  },
  {
    id: "apc-smt3000ic",
    name: "APC SMT3000IC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SMT3000IC_download856.jpg"],
    inStock: true
  },
  {
    id: "apc-smv3000ai-msx",
    name: "APC SMV3000AI-MSX",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SMV3000AI-MSX_hkiy.jpg"],
    inStock: true
  },
  {
    id: "apc-srt1000xli",
    name: "APC SRT1000XLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SRT1000XLI_369.webp"],
    inStock: true
  },
  {
    id: "apc-srt1500xli",
    name: "APC SRT1500XLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SRT1500XLI_uiopl.webp"],
    inStock: true
  },
  {
    id: "apc-srt2200xli",
    name: "APC SRT2200XLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/APC_SRT2200XLI_APC-SRT2200XLI.jpg",
      "/products/apc/srt2200xli_poiu.jpg"
    ],
    inStock: true
  },
  {
    id: "apc-srt3000xli",
    name: "APC SRT3000XLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/srt3000xli_oi.jpg"],
    inStock: true
  },
  {
    id: "apc-srt72bp",
    name: "APC SRT72BP",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SRT72BP_pi.webp"],
    inStock: true
  },
  {
    id: "apc-srt96bp",
    name: "APC SRT96BP",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SRT96BP_APC-SRT96BP.jpg"],
    inStock: true
  },
  {
    id: "apc-srtg10kxli",
    name: "APC SRTG10KXLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC_SRTG10KXLI_download-2.jpg"],
    inStock: true
  },
  {
    id: "apc-srtg5kxli",
    name: "APC SRTG5KXLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/APC_SRTG5KXLI_oiuy.jpg",
      "/products/apc/srtg5kxli_download-3.jpg"
    ],
    inStock: true
  },
  {
    id: "apc-srtg6kxli",
    name: "APC SRTG6KXLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/srtg6kxli_download-3-1.jpg"],
    inStock: true
  },
  {
    id: "apc-rbc55",
    name: "RBC55 APC Replacement Battery Cartridge #55",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/RBC55_download-8.jpg"],
    inStock: true
  },

  // HP Products - Printers
  {
    id: "hp-cp5225n",
    name: "HP CP5225n PRINTER",
    brand: "HP",
    category: "Printers",
    price: 2690,
    images: ["/products/hp/HP_CP5225n_Untitled-design-10.jpg"],
    inStock: true
  },
  {
    id: "hp-m102a",
    name: "HP M 102A Printer",
    brand: "HP",
    category: "Printers",
    price: 600,
    images: ["/products/hp/HP_M_102A_hp52.jpg"],
    inStock: true
  },
  {
    id: "hp-m137fnw",
    name: "HP M 137Fnw Printer",
    brand: "HP",
    category: "Printers",
    price: 610,
    images: ["/products/hp/HP_M_137Fnw_ll.jpg"],
    inStock: true
  },
  {
    id: "hp-m1502w",
    name: "HP M 1502W Printer",
    brand: "HP",
    category: "Printers",
    price: 650,
    images: ["/products/hp/HP_M_1502W_download-1.jpg"],
    inStock: true
  },
  {
    id: "hp-m178nw",
    name: "HP M 178nw Printer",
    brand: "HP",
    category: "Printers",
    price: 875,
    images: ["/products/hp/HP_M_178nw_Untitled-design-12.jpg"],
    inStock: true
  },
  {
    id: "hp-m179fnw",
    name: "HP M 179FNW",
    brand: "HP",
    category: "Printers",
    price: 810,
    images: ["/products/hp/HP_M_179FNW_Untitled-design-11.jpg"],
    inStock: true
  },
  {
    id: "hp-m182n",
    name: "HP M 182N Printer",
    brand: "HP",
    category: "Printers",
    price: 900,
    images: [
      "/products/hp/HP_M_182N_Printer.webp",
      "/products/hp/HP_M_182N_Untitled-design-13.webp"
    ],
    inStock: true
  },
  {
    id: "hp-m236d",
    name: "HP M 236D Printer",
    brand: "HP",
    category: "Printers",
    price: 600,
    images: ["/products/hp/HP_M_236D_ppppp.jpg"],
    inStock: true
  },
  {
    id: "hp-m236sdw",
    name: "HP M 236sdw",
    brand: "HP",
    category: "Printers",
    price: 670,
    images: ["/products/hp/HP_M_236sdw.jpg"],
    inStock: true
  },
  {
    id: "hp-m28a",
    name: "HP M 28A",
    brand: "HP",
    category: "Printers",
    price: 750,
    images: ["/products/hp/HP_M_28A.webp"],
    inStock: true
  },
  {
    id: "hp-m28w",
    name: "HP M 28W",
    brand: "HP",
    category: "Printers",
    price: 800,
    images: ["/products/hp/HP_M_28W.jpg"],
    inStock: true
  },
  {
    id: "hp-m3303fdw",
    name: "HP M 3303FDW Printer",
    brand: "HP",
    category: "Printers",
    price: 1140,
    images: ["/products/hp/HP_M_3303FDW_hp2020.jpg"],
    inStock: true
  },
  {
    id: "hp-m4103dw",
    name: "HP M 4103dw Printer",
    brand: "HP",
    category: "Printers",
    price: 1050,
    images: ["/products/hp/HP_M_4103dw.jpg"],
    inStock: true
  },
  {
    id: "hp-m4303fdw",
    name: "HP M 4303FDW",
    brand: "HP",
    category: "Printers",
    price: 1450,
    images: ["/products/hp/HP_M_4303FDW_h.jpg"],
    inStock: true
  },
  {
    id: "hp-m507dn",
    name: "HP M507DN PRINTER",
    brand: "HP",
    category: "Printers",
    price: 1325,
    images: ["/products/hp/HP_M507DN_k.jpg"],
    inStock: true
  },
  {
    id: "hp-scanjet-2500",
    name: "HP Scanjet 2500",
    brand: "HP",
    category: "Scanners",
    price: 950,
    images: ["/products/hp/HP_Scanjet_2500.jpg"],
    inStock: true
  },

  // Canon Products - Printers
  {
    id: "canon-mf237w",
    name: "CANON I-SENSYS MF-237W EU MFP",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON_I-SENSYS_MF-237W.webp"],
    inStock: true
  },
  {
    id: "canon-mf275dw",
    name: "Canon I-Sensys MF275DW EU MFP",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon_MF275DW.webp"],
    inStock: true
  },
  {
    id: "canon-g2470",
    name: "CANON IJ MFP G2470 EUM/EMB PRINTER",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON_G2470.webp"],
    inStock: true
  },
  {
    id: "canon-g3410",
    name: "Canon IJ MFP PIXMA G3410 EUM/EMB Printer",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon_PIXMA_G3410.webp"],
    inStock: true
  },
  {
    id: "canon-g3430",
    name: "Canon IJ MFP PIXMA G3430 EUM/EMB",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon_PIXMA_G3430.webp"],
    inStock: true
  },
  {
    id: "canon-g540",
    name: "Canon IJ SFP PIXMA G540 PRINTER",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon_PIXMA_G540.webp"],
    inStock: true
  },
  {
    id: "canon-g3470",
    name: "CANON INKJET MFP G3470 EUM/EMB BK",
    brand: "CANON",
    category: "Printers",
    images: [
      "/products/canon/CANON_G3470_design-8.webp",
      "/products/canon/CANON_G3470.webp"
    ],
    inStock: true
  },
  {
    id: "canon-ts3340",
    name: "CANON INKJET MFP PIXMA TS3340 MEA BLACK",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON_PIXMA_TS3340.webp"],
    inStock: true
  },
  {
    id: "canon-mf453dw",
    name: "CANON LASER MFP I-S MF453DW PRINTER",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON_MF453DW.jpg"],
    inStock: true
  },
  {
    id: "canon-mf651cw",
    name: "Canon Laser MFP I-S MF651CW EMEA",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon_MF651CW.jpg"],
    inStock: true
  },
  {
    id: "canon-mf465dw",
    name: "Canon Laser MFP I-Sensys MF465DW",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon_MF465DW.jpg"],
    inStock: true
  },
  {
    id: "canon-mf461dw",
    name: "Canon Laser MFP Isensys MF461DW",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon_MF461DW.jpg"],
    inStock: true
  },

  // Epson Products - Printers
  {
    id: "epson-l18050",
    name: "EPSON ECOTANK L18050 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L18050_download-17.jpg"],
    inStock: true
  },
  {
    id: "epson-l3210",
    name: "EPSON ECOTANK L3210 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L3210.webp"],
    inStock: true
  },
  {
    id: "epson-l3250",
    name: "EPSON ECOTANK L3250 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L3250.webp"],
    inStock: true
  },
  {
    id: "epson-l3251",
    name: "EPSON ECOTANK L3251 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L3251.webp"],
    inStock: true
  },
  {
    id: "epson-l5290",
    name: "EPSON ECOTANK L5290 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L5290.webp"],
    inStock: true
  },
  {
    id: "epson-l8050",
    name: "EPSON ECOTANK L8050 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L8050_download-16.jpg"],
    inStock: true
  },
  {
    id: "epson-l11050",
    name: "EPSON PRINTER L11050 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L11050_printer-1.jpg"],
    inStock: true
  },
  {
    id: "epson-l14150",
    name: "EPSON PRINTER L14150 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_L14150_printer-3.jpg"],
    inStock: true
  },
  {
    id: "epson-lq590",
    name: "EPSON LQ 590",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_LQ590.webp"],
    inStock: true
  },
  {
    id: "epson-lq350",
    name: "EPSON LQ350 / LX350",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_LQ350.webp"],
    inStock: true
  },
  {
    id: "epson-lq2190",
    name: "EPSON- LQ2190",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_LQ2190.jpg"],
    inStock: true
  },
  {
    id: "epson-tmt220d",
    name: "EPSON-TMT220d",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_TMT220d.webp"],
    inStock: true
  },
  {
    id: "epson-tmt88vi",
    name: "EPSON-TMT88VI",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON_TMT88VI.webp"],
    inStock: true
  },

  // Brother Products - Printers
  {
    id: "brother-dcpl3520cdw",
    name: "DCP-L3520CDW COLOUR 3IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/DCP-L3520CDW.webp"],
    inStock: true
  },
  {
    id: "brother-dcpl3560cdw",
    name: "DCP-L3560CDW COLOUR 4IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/DCP-L3560CDW.webp"],
    inStock: true
  },
  {
    id: "brother-hll3220cw",
    name: "HL-L3220CW COLOUR ONLY PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/HL-L3220CW.webp"],
    inStock: true
  },
  {
    id: "brother-hll3280cdw",
    name: "HL-L3280CDW COLOUR ONLY PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/HL-L3280CDW.webp"],
    inStock: true
  },
  {
    id: "brother-mfcl3760cdw",
    name: "MFC-L3760CDW COLOUR 4IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/MFC-L3760CDW.jpg"],
    inStock: true
  },
  {
    id: "brother-mfcl8390cdw",
    name: "MFC-L8390CDW COLOUR 4IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/MFC-L8390CDW.jpg"],
    inStock: true
  }
];

export const brands = ["All", "APC", "HP", "CANON", "Epson", "Brother"];
export const categories = ["All", "UPS & Batteries", "Printers", "Scanners"];
