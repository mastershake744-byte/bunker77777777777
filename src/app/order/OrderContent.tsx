'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { boilersData } from '@/data/products';
import { Suspense, useEffect, useState } from 'react';

export default function OrderContent() {
  const searchParams = useSearchParams();
  const productUrl = searchParams.get('product') || '';
  const product = boilersData.find((b) => b.url === productUrl || b.url === productUrl + '/');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qty, setQty] = useState(1);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validatePhone = (v: string) => {
    const digits = v.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 12) return 'Введите телефон в формате +7 или 8 (10-12 цифр)';
    if (!/^[78]/.test(digits)) return 'Телефон должен начинаться с +7 или 8';
    return '';
  };

  const validateName = (v: string) => {
    if (!v.trim()) return 'Укажите имя';
    if (v.trim().length < 2) return 'Имя слишком короткое';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nErr = validateName(name);
    const pErr = validatePhone(phone);
    setNameError(nErr);
    setPhoneError(pErr);
    if (nErr || pErr) return;
    setSubmitted(true);
  };

  useEffect(() => {
    if (!product) return;
    setQty(1);
  }, [product]);

  const moneyFmt = (s: string) => s;

  return (
    <>
      <style>{`
:root{
--bg:#050807;
--card:#090d0b;
--text:#fff;
--muted:#9b9f9c;
--accent:#22e968;
}
body.light-mode{
--bg:#f3eadf;
--card:#fff8ef;
--text:#29231d;
--muted:#786d61;
--accent:#b87935;
}
*{box-sizing:border-box;margin:0;padding:0}
body{
font-family:Arial,sans-serif;
background:var(--bg);
color:var(--text);
transition:.3s;
}
.order-page{
max-width:760px;
margin:0 auto;
padding:48px 24px 64px;
}
.order-title{font-size:36px;font-weight:900;margin-bottom:8px}
.order-title span{color:var(--accent)}
.order-sub{color:var(--muted);font-size:16px;margin-bottom:36px}

.order-card{
background:var(--card);border:1px solid #5553;border-radius:18px;
padding:28px;display:flex;gap:20px;align-items:center;margin-bottom:28px;
}
.order-card-img{
width:96px;height:96px;flex-shrink:0;border-radius:12px;
background:var(--bg);display:flex;align-items:center;justify-content:center;overflow:hidden;
}
.order-card-img img{width:100%;height:100%;object-fit:contain;padding:8px}
.order-card-info{flex:1;min-width:0}
.order-card-info .model{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:4px}
.order-card-info h3{font-size:18px;font-weight:700;margin-bottom:6px;line-height:1.2}
.order-card-info .price{font-size:20px;font-weight:800;color:var(--accent)}

.order-form{display:flex;flex-direction:column;gap:20px}
.form-group{display:flex;flex-direction:column;gap:8px}
.form-group label{font-size:14px;font-weight:600;color:var(--text)}
.form-group label b{color:var(--accent)}
.form-group input{
padding:14px 18px;border-radius:12px;border:1px solid #5555;
background:var(--bg);color:var(--text);font-size:16px;outline:none;transition:border-color .2s;
}
.form-group input:focus{border-color:var(--accent)}
.form-group input::placeholder{color:var(--muted)}
.form-group .error{color:#ff6b6b;font-size:13px}
.qty-row{display:flex;align-items:center;gap:14px}
.qty-btn{
width:44px;height:44px;border-radius:10px;border:1px solid #5555;
background:var(--card);color:var(--text);font-size:22px;font-weight:700;
cursor:pointer;transition:border-color .2s, background .2s;
}
.qty-btn:hover{border-color:var(--accent);background:rgba(34,233,104,.08)}
.qty-val{
min-width:52px;text-align:center;font-size:20px;font-weight:800;
}

.order-submit{
padding:16px 28px;border-radius:12px;border:none;
background:var(--accent);color:#000;font-weight:800;font-size:17px;
cursor:pointer;transition:opacity .2s, transform .2s;margin-top:8px;
}
.order-submit:hover{opacity:.88;transform:translateY(-1px)}
.order-submit:disabled{opacity:.5;cursor:not-allowed}
.order-note{font-size:13px;color:var(--muted);text-align:center;margin-top:12px}

.success-box{
background:var(--card);border:1px solid var(--accent);border-radius:18px;
padding:48px 32px;text-align:center;
}
.success-box svg{width:64px;height:64px;color:var(--accent);margin-bottom:16px}
.success-box h2{font-size:26px;margin-bottom:10px}
.success-box p{color:var(--muted);font-size:15px;line-height:1.6;margin-bottom:24px}
.success-box a{
display:inline-block;padding:13px 26px;border-radius:10px;
background:var(--accent);color:#000;font-weight:700;text-decoration:none;
}

.empty-box{
background:var(--card);border:1px solid #5553;border-radius:18px;
padding:56px 32px;text-align:center;
}
.empty-box h2{font-size:24px;margin-bottom:10px}
.empty-box p{color:var(--muted);margin-bottom:24px}
.empty-box a{
display:inline-block;padding:13px 26px;border-radius:10px;
background:var(--accent);color:#000;font-weight:700;text-decoration:none;
}
@media(max-width:600px){
.order-page{padding:28px 16px}
.order-title{font-size:28px}
.order-card{flex-direction:column;text-align:center;padding:20px}
.order-card-img{width:120px;height:120px}
}
      `}</style>

      <div className="order-page">
        <h1 className="order-title">Оформление <span>заказа</span></h1>
        <p className="order-sub">Заполните форму — мы свяжемся с вами для подтверждения</p>

        {!product && !submitted && (
          <div className="empty-box">
            <h2>Товар не выбран</h2>
            <p>Перейдите в каталог и нажмите «Заказать» на понравившемся товаре.</p>
            <Link href="/shop/">Перейти в магазин</Link>
          </div>
        )}

        {product && submitted && (
          <div className="success-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
            </svg>
            <h2>Заявка отправлена</h2>
            <p>
              {name ? `Спасибо, ${name.trim()}! ` : ''}Ваш заказ принят:<br/>
              <b>{product.name}</b> — {qty} шт. ({moneyFmt(product.price)})<br/><br/>
              Менеджер свяжется с вами в ближайшее время для подтверждения.<br/>
              Или позвоните нам: <b>8 982 324-95-25</b>
            </p>
            <Link href={`/product/${product.url.replace(/\/$/, '')}/`}>Вернуться к товару</Link>
          </div>
        )}

        {product && !submitted && (
          <form className="order-form" onSubmit={handleSubmit} noValidate>
            <div className="order-card">
              <div className="order-card-img">
                <img src={product.photo} alt={product.name} />
              </div>
              <div className="order-card-info">
                <div className="model">{product.razdel}</div>
                <h3>{product.name}</h3>
                <div className="price">{moneyFmt(product.price)}</div>
              </div>
            </div>

            <div className="form-group">
              <label>Количество <b>*</b></label>
              <div className="qty-row">
                <button type="button" className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>&minus;</button>
                <span className="qty-val">{qty}</span>
                <button type="button" className="qty-btn" onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
              </div>
            </div>

            <div className="form-group">
              <label>Ваше имя <b>*</b></label>
              <input
                type="text"
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => { setName(e.target.value); if (nameError) setNameError(validateName(e.target.value)); }}
              />
              {nameError && <span className="error">{nameError}</span>}
            </div>

            <div className="form-group">
              <label>Телефон <b>*</b></label>
              <input
                type="tel"
                placeholder="+7 (900) 000-00-00"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); if (phoneError) setPhoneError(validatePhone(e.target.value)); }}
              />
              {phoneError && <span className="error">{phoneError}</span>}
            </div>

            <button type="submit" className="order-submit">Оформить заказ</button>
            <p className="order-note">
              Нажимая «Оформить заказ», вы соглашаетесь с обработкой персональных данных.<br/>
              Менеджер свяжется с вами для подтверждения заказа.
            </p>
          </form>
        )}
      </div>
    </>
  );
}