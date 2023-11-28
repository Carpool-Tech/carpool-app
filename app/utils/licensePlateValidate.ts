const BRASIL_LICENSE_PLATE_REGEX = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;

export function licensePlateValidate(licensePlate: string) {
  const license = licensePlate.toUpperCase();
  const isValid = BRASIL_LICENSE_PLATE_REGEX.test(license);
  return isValid;
}
