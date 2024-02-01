'use client';

import { useEffect, useState } from 'react';

function whereToName(where: string): string {
  switch (where) {
    case 'kjlb':
      return '梶研究室';
    case 'sysken':
      return 'シス研';
    default:
      return 'その他';
  }
}

export default function Home() {
  const [where, setWhere] = useState('取得中');
  const [err, setErr] = useState('');
  const [time, setTime] = useState('-');

  useEffect(() => {
    (async () => {
      if (process.env.NEXT_PUBLIC_API_URL === undefined) {
        setErr('API_URL is not defined');
        return;
      }

      await fetch(process.env.NEXT_PUBLIC_API_URL)
        .then((res) => res.json())
        .then((res) => {
          setWhere(whereToName(res.where));
          setErr('');
        })
        .catch((err) => {
          setWhere('');
          setErr(JSON.stringify(err));
        });
      setTime(new Date().toLocaleString());
    })();
  }, []);

  return (
    <main className="bg-indigo-950 flex justify-center items-center">
      <div className="bg-white pt-8 pb-6 px-10 rounded-lg text-center w-96">
        <p className="text-indigo-900 text-4xl font-bold">{where}</p>
        <p className="text-red-600 font-bold">{err}</p>
        <p className='pt-2'>{time}</p>
      </div>
    </main>
  );
}
