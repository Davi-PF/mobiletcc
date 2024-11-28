export const isTokenValid = (dataCadastro, validityPeriodDays = 30) => {
    const registrationDate = new Date(dataCadastro);
    const currentDate = new Date();
    const differenceInTime = currentDate - registrationDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= validityPeriodDays;
  };
  