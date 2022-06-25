export function getNamaHari(number) {
  number = parseInt(number | 0);
  let result = "";
  if (number === 1) {
    result = "senin";
  } else if (number === 2) {
    result = "selasa";
  } else if (number === 3) {
    result = "rabu";
  } else if (number === 4) {
    result = "kamis";
  } else if (number === 5) {
    result = "jumat";
  } else if (number === 6) {
    result = "sabtu";
  } else if (number === 7) {
    result = "minggu";
  }

  return result;
}

export function ucasefirst(string) {
  if (!string) {
    return "";
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export function ucase(string) {
  if (!string) {
    return "";
  } else {
    return string.toUpperCase();
  }
}

export function thousandSeparator(string) {
  let money = Number(string);
  return new Intl.NumberFormat(
    "id-ID"
    // , { 
    //   style: "currency", 
    //   currency: "IDR", 
    //   minimumFractionDigits: 0 
    // }
  ).format(money);
}

export function formatDate(string) {
  const dateOptions = {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const myDate = new Date(string);
  
  return myDate.toLocaleDateString('id-ID', dateOptions).replaceAll('.', ':');
}