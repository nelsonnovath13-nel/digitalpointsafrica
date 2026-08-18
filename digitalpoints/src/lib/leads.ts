import { supabase } from "./supabase";

export type ServiceCategory =
  | "media_production"
  | "photography"
  | "videography"
  | "live_streaming"
  | "website_design"
  | "web_applications"
  | "business_systems"
  | "ecommerce"
  | "ai_automation"
  | "whatsapp_bots"
  | "customer_support_automation"
  | "lead_generation_systems"
  | "branding_design"
  | "printing_services"
  | "training"
  | "digital_consultation"
  | "website_maintenance"
  | "other";

export interface SubmitLeadPayload {
  formType: "contact" | "quotation" | "training" | "consultation" | "newsletter";
  name: string;
  email: string;
  phone?: string;
  serviceCategory?: ServiceCategory;
  message?: string;
  sourcePage?: string;

  // quotation
  budgetRange?: string;
  timeline?: string;
  requirements?: string;

  // training
  trainingType?: string;
  isTrainerBooking?: boolean;
  topic?: string;
  numberOfParticipants?: number;
  preferredStartDate?: string;
  organizationName?: string;

  // consultation
  consultationType?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface SubmitLeadResult {
  leadId: string;
  quotationRequestId: string | null;
}

export async function submitLead(payload: SubmitLeadPayload): Promise<SubmitLeadResult> {
  const { data, error } = await supabase.functions.invoke<SubmitLeadResult>("submit-lead", {
    body: payload,
  });

  if (error) throw error;
  if (!data) throw new Error("No response from submit-lead");
  return data;
}
