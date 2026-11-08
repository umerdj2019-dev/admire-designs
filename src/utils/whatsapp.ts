/** Build and open a WhatsApp click-to-chat link with a prefilled message. */
import { WHATSAPP_LINK } from '../data/products';

export function openWhatsAppMessage(message: string): void {
  const url = new URL(WHATSAPP_LINK);
  url.searchParams.set('text', message);
  const target = url.toString();
  const opened = window.open(target, '_blank');
  if (!opened) window.location.assign(target);
}
