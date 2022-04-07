export function getNamaHari(number) {
  number = parseInt(number|0);
  let result = '';
  if (number === 1) {
    result = 'senin';
  } else if (number === 2) {
    result = 'selasa';
  } else if (number === 3) {
    result = 'rabu';
  } else if (number === 4) {
    result = 'kamis';
  } else if (number === 5) {
    result = 'jumat';
  } else if (number === 6) {
    result = 'sabtu';
  } else if (number === 7) {
    result = 'minggu';
  }
  
  return result;
}

export function ucasefirst(string) {
  if ( ! string) { 
    return '';
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export function ucase(string) {
  if ( ! string) { 
    return '';
  } else {
    return string.toUpperCase();
  }
}