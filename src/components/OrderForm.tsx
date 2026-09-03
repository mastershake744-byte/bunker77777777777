import React, { useState } from 'react';

interface OrderFormProps {
  productName?: string;
  onSuccess?: () => void;
}

export function OrderForm({ productName, onSuccess }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }));
  };

  const validatePhone = (phone: string): boolean => {
    return /^(\+7|8)\d{10}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.phone) {
      setMessage({ type: 'error', text: 'Телефон обязателен' });
      return;
    }
    if (!validatePhone(formData.phone)) {
      setMessage({ type: 'error', text: 'Неверный формат телефона. Используйте +7 или 8 и 10 цифр' });
      return;
    }
    if (!formData.consent) {
      setMessage({ type: 'error', text: 'Необходимо согласие на обработку персональных данных' });
      return;
    }

    setIsSubmitting(true);

    try {
      const textBody = [
        `Новая заявка с сайта`,
        `Товар: ${productName || 'Не указан'}`,
        `Имя: ${formData.name || 'Не указано'}`,
        `Телефон: ${formData.phone}`,
        `Email: ${formData.email || 'Не указан'}`,
        `Адрес: ${formData.address || 'Не указан'}`,
        `Дата: ${new Date().toLocaleString('ru-RU')}`,
      ].join('\n');

      const htmlBody = [
        '<h2>Новая заявка с сайта</h2>',
        `<p><strong>Товар:</strong> ${productName || 'Не указан'}</p>`,
        `<p><strong>Имя:</strong> ${formData.name || 'Не указано'}</p>`,
        `<p><strong>Телефон:</strong> ${formData.phone}</p>`,
        `<p><strong>Email:</strong> ${formData.email || 'Не указан'}</p>`,
        `<p><strong>Адрес:</strong> ${formData.address || 'Не указан'}</p>`,
        `<p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>`,
      ].join('\n');

      console.log('Order:', { to: 'kotli@teplo-en.ru', subject: `Заявка: ${productName || 'Товар'}`, htmlBody, textBody });

      setMessage({ type: 'success', text: 'Заявка успешно отправлена! Мы свяжемся с вами.' });
      setFormData({ name: '', phone: '', email: '', address: '', consent: false });
      if (onSuccess) onSuccess();
    } catch {
      setMessage({ type: 'error', text: 'Ошибка при отправке. Попробуйте позже.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2 className="order-form-title">Заказать {productName || 'товар'}</h2>

      {message && (
        <div className={`order-message order-message--${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="order-form-grid">
        <div className="order-form-field">
          <label htmlFor="name">Имя</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Иван Иванов" />
        </div>

        <div className="order-form-field">
          <label htmlFor="phone">Телефон <span className="required">*</span></label>
          <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+79123456789" required />
          <small>Формат: +7XXXXXXXXXX или 8XXXXXXXXXX</small>
        </div>

        <div className="order-form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@mail.ru" />
        </div>

        <div className="order-form-field">
          <label htmlFor="address">Адрес доставки</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Город, улица, дом, квартира" rows={3} />
        </div>
      </div>

      <div className="order-form-consent">
        <label>
          <input type="checkbox" checked={formData.consent} onChange={handleCheckbox} required />
          <span>Я согласен на обработку персональных данных в соответствии с <a href="https://152-фз.рф/" target="_blank" rel="noopener noreferrer">ФЗ-152</a></span>
        </label>
        <p>Ваши данные используются только для обработки заказа и не передаются третьим лицам</p>
      </div>

      <button type="submit" className="order-form-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}