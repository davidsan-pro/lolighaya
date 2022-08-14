// import React from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { Linking } from "react-native";
import * as html2canvas from "html2canvas";
// import * as htmlToImage from 'html-to-image';
// import { toJpeg } from 'html-to-image';
// import { useLocation } from "react-router-dom";

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
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  if (mode === 'full-date') {
    dateOptions = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
    }
  }
  if (mode === 'full-short') {
    dateOptions = {
      weekday: 'long', 
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
      weekday: 'long', 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  else if (mode === 'datetime-std') {
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

// sumber: https://stackoverflow.com/a/61843183/1235167
export function sendWhatsApp(phone='', msg='') {
  if (!msg) {
    alert('Pesan yang akan dikirimkan melalui whatsapp tidak boleh kosong.')
    return;
  }
  if (!phone) {
    alert('No.whatsapp tujuan tidak boleh kosong.');
    return;
  }

  let phoneWithCountryCode = `62${ltrim(phone, '0')}`;

  // let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
  let mobile = `+${phoneWithCountryCode}`;
  let url = `whatsapp://send?phone=${mobile}&text=${msg}`;
  Linking.openURL(url).then((data) => {
    console.log('WhatsApp Opened');
  }).catch(() => {
    alert('Please make sure WhatsApp installed on your device');
  });
}
// end export function sendWhatsApp

export function ltrim(val, char='') {
  let string = val.toString();
  while (string.charAt(0) === char) { // Assume we remove all leading zeros
      string = string.substr(1, string.length-1)
  }
  return string;
}

// export function componentToImage(elemID, filename) {
//   filename += '_' + formatDate(null, 'datetime-std');
//   htmlToImage.toJpeg(document.getElementById(elemID), { quality: 0.95 })
//   .then(function (dataUrl) {
//     var link = document.createElement('a');
//     link.download = `${filename}.jpeg`;
//     link.href = dataUrl;
//     link.click();
//   });
// }

export function prepURL(urlPart, qsArr=[]) {
  let myurl = `${getBaseUrl()}${urlPart}`;
  if (qsArr.length > 0) {
    const qs = qsArr.join('&');
    myurl += `?${qs}`;
  }
  return myurl;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) 
    return parts.pop().split(';').shift();
}

export function removeNonNumeric(str) {
  return str.replace(/\D/g,'');
}

export function formatNoNota(str) {
  return str.padStart(4, '0');
}

export function saveElementAsImage(elemID, targetName, format='image/jpg') {
  (async () => {
    const element = document.getElementById(elemID);
    // console.log('saveElementAsImage', elemID, element);
    if (!element) {
      alert('Elemen yang akan dicetak tidak ditemukan');
      return;
    }
    const canvas = await html2canvas(element),
    data = canvas.toDataURL('image/jpg'),
    link = document.createElement('a');

    link.href = data;
    link.download = targetName;
    // link.download = `Lolighaya-${fn.formatNoNota(id)}-${dataToko.nama_toko.replaceAll(' ', '_')}.jpg`;
    // link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })();
}