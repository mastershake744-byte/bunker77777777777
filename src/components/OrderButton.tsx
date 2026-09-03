import React, { useState } from 'react';
import { OrderForm } from './OrderForm';

interface OrderButtonProps {
  productName: string;
  className?: string;
}

export function OrderButton({ productName, className }: OrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`order-button ${className || ''}`}
        onClick={() => setIsOpen(true)}
      >
        Заказать
      </button>

      {isOpen && (
        <div className="order-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="order-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <OrderForm productName={productName} onSuccess={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}