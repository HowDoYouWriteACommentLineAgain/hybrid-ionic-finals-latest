import { CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

export const scanBarcodeAndDo = async (next:(result:string)=>void) => {
  const result = await CapacitorBarcodeScanner.scanBarcode({
    hint: CapacitorBarcodeScannerTypeHint.CODE_128,
    scanInstructions: "Please point cemera to the barcode",
    scanButton: true,
    scanText:"Scan"
    
  } as CapacitorBarcodeScannerOptions);
  console.log('Scan result:', result.ScanResult);
  next(result.ScanResult);
};
