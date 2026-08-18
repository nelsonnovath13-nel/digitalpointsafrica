import { supabase } from "./supabase";

export async function uploadQuotationFiles(quotationRequestId: string, files: File[]): Promise<void> {
  for (const file of files) {
    const path = `${quotationRequestId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("quotation-uploads")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      console.error(`Failed to upload ${file.name}`, uploadError);
      continue;
    }

    await supabase.from("quotation_files").insert({
      quotation_request_id: quotationRequestId,
      storage_path: path,
      file_name: file.name,
      content_type: file.type,
      size_bytes: file.size,
    });
  }
}
