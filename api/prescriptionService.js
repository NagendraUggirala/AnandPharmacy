export async function uploadPrescriptionToServer(fileBase64) {
  // mock server upload – integrate real backend later
  return {
    success: true,
    url: fileBase64,    // normally server returns hosted URL
    time: new Date().toISOString()
  };
}
