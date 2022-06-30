import * as XLSX from "xlsx";

export function getBaseUrl() {
  return "https://lolighaya-be.davidsan.my.id"; // "http://localhost:8080",
}

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

export function formatDate(string=null, mode='full') {
  let dateOptions = {};
  if (mode === 'full') {
    dateOptions = {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  else if (mode === 'date') {
    dateOptions = {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
    }
  }
  else if (mode === 'date-std') {
    dateOptions = {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
    }
  }
  else if (mode === 'time') {
    dateOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  const myDate = new Date(string);
  
  return myDate.toLocaleDateString('id-ID', dateOptions).replaceAll('.', ':');
}

export function handleClickExportToExcel(sourceData) {
  let mydata = [];
  sourceData.map(item => {
    mydata.push({
      'TANGGAL': item.updated_at,
      'NAMA TOKO': item.nama_toko,
      'USERNAME': item.username,
      'NILAI TRANSAKSI': item.nilai_transaksi,
    });
  });
  let wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(mydata);

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  let tmpDate = new Date();
  const tmpOptions = {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  tmpDate = tmpDate.toLocaleDateString('id-ID', tmpOptions);
  tmpDate = tmpDate.replaceAll('/', '-').replace(' ', '_');
  XLSX.writeFile(wb, `histori_transaksi_${tmpDate}.xlsx`);
}
