import * as XLSX from "xlsx";
import { toast } from "react-toastify";

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
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  if (mode === 'full-short') {
    dateOptions = {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  else if (mode === 'full-std') {
    dateOptions = {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  else if (mode === 'date-short') {
    dateOptions = {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
    }
  }
  else if (mode === 'date-long') {
    dateOptions = {
      year: 'numeric', 
      month: 'long', 
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
  const myDate = string === null ? new Date() : new Date(string);
  
  return myDate.toLocaleDateString('id-ID', dateOptions).replaceAll('.', ':');
}

export function handleClickExportToExcel(sourceData, dataCat='') {
  let mydata = [];
  sourceData.map(item => {
    if (dataCat == 'histori_transaksi') {
      mydata.push({
        'TANGGAL': item.updated_at,
        'NAMA TOKO': item.nama_toko,
        'USERNAME': item.username,
        'NILAI TRANSAKSI': item.nilai_transaksi,
      });
    } else {
      mydata.push(item);
    }
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
  let namaFile = dataCat === 'histori transaksi' ? 'Histori Transaksi' : dataCat;
  XLSX.writeFile(wb, `${namaFile}_${tmpDate}.xlsx`);
}

export function showToastMsg(string, mode='success') {
  const options = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  if (mode === 'success') {
    toast.success(string, options);
  } else if (mode === 'error') {
    toast.error(string, options);
  } else if (mode === 'info') {
    toast.info(string, options);
  }
}

export function getCurrentLogin() {
  let tmp = JSON.parse(localStorage.getItem('loginData') || '{}');
  // console.log('tmp', tmp);
  return tmp;
}