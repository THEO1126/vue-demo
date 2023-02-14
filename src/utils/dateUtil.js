// 日期格式化 
// 从 Nov 9, 2022, 12:00:00 AM vi 变成 2022-11-09

export function dateFormat(date) {
    var d=new Date(date); 
    d=d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2,'0') + '-' + d.getDate().toString().padStart(2,'0'); 
    return d;
}

export function timeFormat(date) {
  var d=new Date(date); 
  d=d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2,'0') + '-' + d.getDate().toString().padStart(2,'0')+" "
  +d.getHours().toString().padStart(2,'0')+":"+d.getMinutes().toString().padStart(2,'0')+":"+d.getSeconds().toString().padStart(2,'0'); 
  return d;
}