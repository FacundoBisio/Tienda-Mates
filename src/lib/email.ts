// src/lib/email.ts — envío de emails transaccionales vía Resend
// Requiere: RESEND_API_KEY, ORDER_NOTIFY_FROM (ej. "FFMATES <no-reply@ffmates.com>"), ORDER_NOTIFY_TO

type OrderItem = { name: string; quantity: number; price: string };

interface OrderPayload {
  id: string;
  items: OrderItem[];
  total: number;
}

export async function sendOrderEmail({ id, items, total }: OrderPayload): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_NOTIFY_FROM;
  const to = process.env.ORDER_NOTIFY_TO;

  if (!key || !from || !to) {
    console.warn('[email] Resend no configurado — salteando envío');
    return;
  }

  const rows = items
    .map(
      (it) =>
        `<tr>
           <td style="padding:8px;border-bottom:1px solid #eee">${escape(it.name)}</td>
           <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${it.quantity}</td>
           <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${escape(it.price)}</td>
         </tr>`
    )
    .join('');

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1C1C1C">
      <h2 style="color:#3C503A;margin:0 0 8px">Nuevo pedido en FFMATES</h2>
      <p style="color:#666;margin:0 0 20px">ID: <strong>${escape(id)}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <thead>
          <tr style="background:#f0f5ef">
            <th style="padding:8px;text-align:left">Producto</th>
            <th style="padding:8px">Cant.</th>
            <th style="padding:8px;text-align:right">Precio</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="font-size:18px;text-align:right"><strong>Total: $${total.toLocaleString('es-AR')}</strong></p>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Nuevo pedido FFMATES — #${id.slice(-6)}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error('[email] Resend error', res.status, await res.text());
    }
  } catch (err) {
    console.error('[email] Resend fallo', err);
  }
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
