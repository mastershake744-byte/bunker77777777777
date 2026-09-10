import { Suspense } from 'react';
import OrderContent from './OrderContent';

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="order-page" style={{padding:40,textAlign:'center',color:'var(--muted)'}}>Загрузка...</div>}>
      <OrderContent />
    </Suspense>
  );
}