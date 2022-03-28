import React from 'react'
import { useLocation } from 'react-router-dom'

const RuteDetailToko = () => {

  console.log('rute detail toko');
  const location = useLocation();
  const qs = location.search;
  const qs_arr = qs.split('?');
  const filtered = qs_arr.filter(function(value, index, arr) {
    return value !== '';
  });
  let id = 0;
  filtered.map((item, index) => {
    const tmp = item.split('=');
    if (tmp[1]) {
      id = tmp[1].toString();
    }
  });

  return (
    <div className='container has-text-centered'>
      Halaman Detail Toko ID {id > 0 ? id : '-'}
    </div>
  )
}

export default RuteDetailToko