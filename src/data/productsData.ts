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
      "/products/apc/APC%20BV650i-MSX_APC-BV650i-MSX.webp",
      "/products/apc/APC%20BV650i-MSX_APC.jpg"
    ],
    inStock: true
  },
  {
    id: "apc-bv800i-msx",
    name: "APC BV800i-MSX",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/APC%20BV800i-MSX_APC-BV800i-MSX.webp",
      "/products/apc/APC%20BV800i-MSX_n1.webp"
    ],
    inStock: true
  },
  {
    id: "apc-bx750mi",
    name: "APC BX750MI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20BX750MI_APC-BX750MI.jpg"],
    inStock: true
  },
  {
    id: "apc-easy-srv1ki",
    name: "APC EASY SRV1KI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20EASY%20SRV1KI_APC-EASY-SRV1KI.webp"],
    inStock: true
  },
  {
    id: "apc-easy-srv3krilrk",
    name: "APC EASY SRV3KRILRK",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20EASY%20SRV3KRILRK_APC-EASY-SRV3KRILRK.webp"],
    inStock: true
  },
  {
    id: "apc-rbc7",
    name: "APC Replacement Battery Cartridge #7",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20Replacement%20Battery%20Cartri_download-7.jpg"],
    inStock: true
  },
  {
    id: "apc-smc1000ic",
    name: "APC SMC1000IC / 1500IC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SMC1000IC%20%201500IC_APC-SMC1000I1500.jpg"],
    inStock: true
  },
  {
    id: "apc-smc3000i",
    name: "APC SMC3000I",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SMC3000I_jk.jpg"],
    inStock: true
  },
  {
    id: "apc-smc3000rmi2uc",
    name: "APC SMC3000RMI2UC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SMC3000RMI2UC_ko-e1755939839468.webp"],
    inStock: true
  },
  {
    id: "apc-smt1000i-ic",
    name: "APC SMT1000I – IC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SMT1000I%20%20IC_lo.jpg"],
    inStock: true
  },
  {
    id: "apc-smt3000ic",
    name: "APC SMT3000IC",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SMT3000IC_download856.jpg"],
    inStock: true
  },
  {
    id: "apc-smv3000ai-msx",
    name: "APC SMV3000AI-MSX",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SMV3000AI-MSX_hkiy.jpg"],
    inStock: true
  },
  {
    id: "apc-srt1000xli",
    name: "APC SRT1000XLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SRT1000XLI_8030DB440449C565852583ED00640FBD_JVAN_BBRPHY_f_h_hi_369-e1755938871313.webp"],
    inStock: true
  },
  {
    id: "apc-srt1500xli",
    name: "APC SRT1500XLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SRT1500XLI_uiopl.webp"],
    inStock: true
  },
  {
    id: "apc-srt2200xli",
    name: "APC SRT2200XLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/APC%20SRT2200XLI_APC-SRT2200XLI.jpg",
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
    images: ["/products/apc/APC%20SRT72BP_pi-e1755939821256.webp"],
    inStock: true
  },
  {
    id: "apc-srt96bp",
    name: "APC SRT96BP",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SRT96BP_APC-SRT96BP.jpg"],
    inStock: true
  },
  {
    id: "apc-srtg10kxli",
    name: "APC SRTG10KXLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: ["/products/apc/APC%20SRTG10KXLI_download-2.jpg"],
    inStock: true
  },
  {
    id: "apc-srtg5kxli",
    name: "APC SRTG5KXLI",
    brand: "APC",
    category: "UPS & Batteries",
    images: [
      "/products/apc/APC%20SRTG5KXLI_oiuy.jpg",
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
    images: ["/products/apc/RBC55%20APC%20Replacement%20Battery_download-8.jpg"],
    inStock: true
  },

  // HP Products - Printers
  {
    id: "hp-cp5225n",
    name: "HP CP5225n PRINTER",
    brand: "HP",
    category: "Printers",
    price: 2690,
    images: ["/products/hp/HP%20CP5225n%20PRINTER%20269010%20QT_Untitled-design-10.jpg"],
    inStock: true
  },
  {
    id: "hp-m102a",
    name: "HP M 102A Printer",
    brand: "HP",
    category: "Printers",
    price: 600,
    images: ["/products/hp/HP%20M%20102A%20Printer%20%20600.00._hp52-e1755940257703.jpg"],
    inStock: true
  },
  {
    id: "hp-m137fnw",
    name: "HP M 137Fnw Printer",
    brand: "HP",
    category: "Printers",
    price: 610,
    images: ["/products/hp/HP%20M%20137Fnw%20Printer%20%20610.00._ll-e1755939079903.jpg"],
    inStock: true
  },
  {
    id: "hp-m1502w",
    name: "HP M 1502W Printer",
    brand: "HP",
    category: "Printers",
    price: 650,
    images: ["/products/hp/HP%20M%201502W%20Printer%20%20650.00._download-1-e1755939922613.jpg"],
    inStock: true
  },
  {
    id: "hp-m178nw",
    name: "HP M 178nw Printer",
    brand: "HP",
    category: "Printers",
    price: 875,
    images: ["/products/hp/HP%20M%20178nw%20Printer%20%20875.00._Untitled-design-12.jpg"],
    inStock: true
  },
  {
    id: "hp-m179fnw",
    name: "HP M 179FNW",
    brand: "HP",
    category: "Printers",
    price: 810,
    images: ["/products/hp/HP%20M%20179FNW%20%20810.00%20%2013QTY_Untitled-design-11.jpg"],
    inStock: true
  },
  {
    id: "hp-m182n",
    name: "HP M 182N Printer",
    brand: "HP",
    category: "Printers",
    price: 900,
    images: [
      "/products/hp/HP%20M%20182N%20Printer%20%20900.00_HP-M-182N-Printer--900.00.--9-QTY.webp",
      "/products/hp/HP%20M%20182N%20Printer%20%20900.00_Untitled-design-13.webp"
    ],
    inStock: true
  },
  {
    id: "hp-m236d",
    name: "HP M 236D Printer",
    brand: "HP",
    category: "Printers",
    price: 600,
    images: ["/products/hp/HP%20M%20236D%20Printer%20%20600.00._ppppp.jpg"],
    inStock: true
  },
  {
    id: "hp-m236sdw",
    name: "HP M 236sdw",
    brand: "HP",
    category: "Printers",
    price: 670,
    images: ["/products/hp/HP%20M%20236sdw%20%20670.00.%20%207QTY_HP-M-236sdw--670.00.--7QTY-e1755940337617.jpg"],
    inStock: true
  },
  {
    id: "hp-m28a",
    name: "HP M 28A",
    brand: "HP",
    category: "Printers",
    price: 750,
    images: ["/products/hp/HP%20M%2028A%20%20750.00..%20%201%20QTY_HP-M-28A--750.00.--1-QTY.webp"],
    inStock: true
  },
  {
    id: "hp-m28w",
    name: "HP M 28W",
    brand: "HP",
    category: "Printers",
    price: 800,
    images: ["/products/hp/HP%20M%2028W%20%20800.00..%20%202%20QTY_HP-M-28W--800.00.--2-QTY-e1755940376157.jpg"],
    inStock: true
  },
  {
    id: "hp-m3303fdw",
    name: "HP M 3303FDW Printer",
    brand: "HP",
    category: "Printers",
    price: 1140,
    images: ["/products/hp/HP%20M%203303FDW%20Printer%20%201140_hp2020-e1755940242986.jpg"],
    inStock: true
  },
  {
    id: "hp-m4103dw",
    name: "HP M 4103dw Printer",
    brand: "HP",
    category: "Printers",
    price: 1050,
    images: ["/products/hp/HP%20M%204103dw%20Printer%20%201050.00_pppppppppppppppp-1-e1755939093727.jpg"],
    inStock: true
  },
  {
    id: "hp-m4303fdw",
    name: "HP M 4303FDW",
    brand: "HP",
    category: "Printers",
    price: 1450,
    images: ["/products/hp/HP%20M%204303FDW%20%201450.00_h.jpg"],
    inStock: true
  },
  {
    id: "hp-m507dn",
    name: "HP M507DN PRINTER",
    brand: "HP",
    category: "Printers",
    price: 1325,
    images: ["/products/hp/HP%20M507DN%20PRINTER1325%20%201%20QTY_k.jpg"],
    inStock: true
  },
  {
    id: "hp-scanjet-2500",
    name: "HP Scanjet 2500",
    brand: "HP",
    category: "Scanners",
    price: 950,
    images: ["/products/hp/HP%20Scanjet%202500%20%20950.00%20%204_images-1-e1755939139399.jpg"],
    inStock: true
  },

  // Canon Products - Printers
  {
    id: "canon-mf237w",
    name: "CANON I-SENSYS MF-237W EU MFP",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON%20I-SENSYS%20MF-237W%20EU%20MFP_CANON-I-SENSYS-MF-237W-EU-MFP.webp"],
    inStock: true
  },
  {
    id: "canon-mf275dw",
    name: "Canon I-Sensys MF275DW EU MFP",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon%20I-Sensys%20MF275DW%20EU%20MFP_Canon-I-Sensys-MF275DW-EU-MFP.webp"],
    inStock: true
  },
  {
    id: "canon-g2470",
    name: "CANON IJ MFP G2470 EUM/EMB PRINTER",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON%20IJ%20MFP%20G2470%20EUMEMB%20PRI_CANON-IJ-MFP-G2470-EUMEMB-PRINTER.webp"],
    inStock: true
  },
  {
    id: "canon-g3410",
    name: "Canon IJ MFP PIXMA G3410 EUM/EMB Printer",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon%20IJ%20MFP%20PIXMA%20G3410%20EUME_Canon-IJ-MFP-PIXMA-G3410-EUMEMB-Printer.webp"],
    inStock: true
  },
  {
    id: "canon-g3430",
    name: "Canon IJ MFP PIXMA G3430 EUM/EMB",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon%20IJ%20MFP%20PIXMA%20G3430%20EUME_Canon-IJ-MFP-PIXMA-G3410-EUMEMB-Printer-1.webp"],
    inStock: true
  },
  {
    id: "canon-g540",
    name: "Canon IJ SFP PIXMA G540 PRINTER",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon%20IJ%20SFP%20PIXMA%20G540%20PRINTE_Canon-IJ-MFP-PIXMA-G3410-EUMEMB-Printer-1-1.webp"],
    inStock: true
  },
  {
    id: "canon-g3470",
    name: "CANON INKJET MFP G3470 EUM/EMB BK",
    brand: "CANON",
    category: "Printers",
    images: [
      "/products/canon/CANON%20INKJET%20MFP%20G3470%20EUMEMB_Untitled-design-8-1.webp",
      "/products/canon/CANON%20INKJET%20MFP%20G3470%20EUMEMB_CANON-INKJET-MFP-G3470-EUMEMB-BK-e1755940583625.webp"
    ],
    inStock: true
  },
  {
    id: "canon-ts3340",
    name: "CANON INKJET MFP PIXMA TS3340 MEA BLACK",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON%20INKJET%20MFP%20PIXMA%20TS3340_CANON-INKJET-MFP-PIXMA-TS3340-MEA-BLACK.webp"],
    inStock: true
  },
  {
    id: "canon-mf453dw",
    name: "CANON LASER MFP I-S MF453DW PRINTER",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/CANON%20LASER%20MFP%20I-S%20MF453DW%20PR_CANON-LASER-MFP-I-S-MF453DW-PRINTER-e1755938715467.jpg"],
    inStock: true
  },
  {
    id: "canon-mf651cw",
    name: "Canon Laser MFP I-S MF651CW EMEA",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon%20Laser%20MFP%20I-S%20MF651CW%20EM_E280A2-Canon-Laser-MFP-I-S-MF651CW-EMEA-e1755940507128.jpg"],
    inStock: true
  },
  {
    id: "canon-mf465dw",
    name: "Canon Laser MFP I-Sensys MF465DW",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon%20Laser%20MFP%20I-Sensys%20MF465_Canon-Laser-MFP-I-Sensys-MF465DW-e1755940440714.jpg"],
    inStock: true
  },
  {
    id: "canon-mf461dw",
    name: "Canon Laser MFP Isensys MF461DW",
    brand: "CANON",
    category: "Printers",
    images: ["/products/canon/Canon%20Laser%20MFP%20Isensys%20MF461D_lll-e1755940464258.jpg"],
    inStock: true
  },

  // Epson Products - Printers
  {
    id: "epson-l18050",
    name: "EPSON ECOTANK L18050 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20ECOTANK%20L18050%20PRINTER_download-17.jpg"],
    inStock: true
  },
  {
    id: "epson-l3210",
    name: "EPSON ECOTANK L3210 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20ECOTANK%20L3210%20PRINTER_EPSON-ECOTANK-L3210-PRINTER.webp"],
    inStock: true
  },
  {
    id: "epson-l3250",
    name: "EPSON ECOTANK L3250 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20ECOTANK%20L3250%20PRINTER_EPSON-ECOTANK-L3250-PRINTER.webp"],
    inStock: true
  },
  {
    id: "epson-l3251",
    name: "EPSON ECOTANK L3251 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20ECOTANK%20L3251%20PRINTER_EPSON-ECOTANK-L3251-PRINTER.webp"],
    inStock: true
  },
  {
    id: "epson-l5290",
    name: "EPSON ECOTANK L5290 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20ECOTANK%20L5290%20PRINTER_EPSON-ECOTANK-L5290-PRINTER.webp"],
    inStock: true
  },
  {
    id: "epson-l8050",
    name: "EPSON ECOTANK L8050 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20ECOTANK%20L8050%20PRINTER_download-16.jpg"],
    inStock: true
  },
  {
    id: "epson-l11050",
    name: "EPSON PRINTER L11050 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20PRINTER%20L11050%20PRINTER_printer-1.jpg"],
    inStock: true
  },
  {
    id: "epson-l14150",
    name: "EPSON PRINTER L14150 PRINTER",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20PRINTER%20L14150%20PRINTER_printer-3.jpg"],
    inStock: true
  },
  {
    id: "epson-lq590",
    name: "EPSON LQ 590",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20LQ%20590_EPSON-LQ-590.webp"],
    inStock: true
  },
  {
    id: "epson-lq350",
    name: "EPSON LQ350 / LX350",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON%20LQ350%20%20LX350_lq.webp"],
    inStock: true
  },
  {
    id: "epson-lq2190",
    name: "EPSON- LQ2190",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON-%20LQ2190_Untitled-design-5-1.jpg"],
    inStock: true
  },
  {
    id: "epson-tmt220d",
    name: "EPSON-TMT220d",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON-TMT220d_Untitled-design-6-2.webp"],
    inStock: true
  },
  {
    id: "epson-tmt88vi",
    name: "EPSON-TMT88VI",
    brand: "Epson",
    category: "Printers",
    images: ["/products/epson/EPSON-TMT88VI_EPSON-TMT88VI-1.webp"],
    inStock: true
  },

  // Brother Products - Printers
  {
    id: "brother-dcpl3520cdw",
    name: "DCP-L3520CDW COLOUR 3IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/DCP-L3520CDW%20COLOUR%203IN1%20PRINT_DCP-L3520CDW-COLOUR-3IN1-PRINTER-1.webp"],
    inStock: true
  },
  {
    id: "brother-dcpl3560cdw",
    name: "DCP-L3560CDW COLOUR 4IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/DCP-L3560CDW%20COLOUR%204IN1%20PRINT_DCP-L3560CDW-COLOUR-4IN1-PRINTER.webp"],
    inStock: true
  },
  {
    id: "brother-hll3220cw",
    name: "HL-L3220CW COLOUR ONLY PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/HL-L3220CW%20COLOUR%20ONLY%20PRINTER_HL-L3220CW-COLOUR-ONLY-PRINTER.webp"],
    inStock: true
  },
  {
    id: "brother-hll3280cdw",
    name: "HL-L3280CDW COLOUR ONLY PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/HL-L3280CDW%20COLOUR%20ONLY%20PRINTE_HL-L3280CDW-COLOUR-ONLY-PRINTER.webp"],
    inStock: true
  },
  {
    id: "brother-mfcl3760cdw",
    name: "MFC-L3760CDW COLOUR 4IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/MFC-L3760CDW%20COLOUR%204IN1%20PRINT_MFC-L3760CDW-COLOUR-4IN1-PRINTER.jpg"],
    inStock: true
  },
  {
    id: "brother-mfcl8390cdw",
    name: "MFC-L8390CDW COLOUR 4IN1 PRINTER",
    brand: "Brother",
    category: "Printers",
    images: ["/products/brother/MFC-L8390CDW%20COLOUR%204IN1%20PRINT_p-1.jpg"],
    inStock: true
  }
];

export const brands = ["All", "APC", "HP", "CANON", "Epson", "Brother"];
export const categories = ["All", "UPS & Batteries", "Printers", "Scanners"];
