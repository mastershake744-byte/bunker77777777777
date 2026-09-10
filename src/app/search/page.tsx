import { Suspense } from 'react';
import SearchContent from './SearchContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-page" style={{padding:40,textAlign:'center',color:'var(--muted)'}}>Загрузка...</div>}>
      <SearchContent />
    </Suspense>
  );
}