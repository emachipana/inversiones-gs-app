function generateInstallments(values) {
  const { amount, months, payType } = values;
  // payType: "diario" || "semanal"
  const totalPay = amount + ((amount * 0.10) * months);
  const payments = payType === "diario" ? months * 30 : months * 4;
  let toPay = parseFloat((totalPay / payments).toFixed(1));
  let toReceive = toPay * payments;
  const today = new Date();
  const pays = [];
  
  for(let i = 0; i < payments; i++) {
    let counter = payType === "diario" ? 1 : 7;
    pays[i] = new Date(today.setDate(today.getDate() + counter));
    counter += payType === "diario" ? 1 : 7;
  }

  if(toReceive < totalPay) {
    toPay = toPay.toString().split(".");
    toPay[1] = parseInt(toPay[1]) + 1;
    toPay = parseFloat(toPay.join("."));
    toReceive = toPay * payments;
  }

  return { 
    totalPay,
    payments,
    toPay,
    toReceive,
    pays,
    firstPay: pays[0],
    lastPay: pays[pays.length - 1],
    payType,
    months,
    amount
  }
}

export default generateInstallments;
