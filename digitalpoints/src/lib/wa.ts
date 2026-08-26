export const WHATSAPP_NUMBER = "255750126654";

export function buildWhatsAppLink(phone: string | null | undefined, message: string): string {
  const digits = (phone || WHATSAPP_NUMBER).replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
