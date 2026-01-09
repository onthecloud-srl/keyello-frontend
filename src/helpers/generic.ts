export const generateUniqueId = (): string => {
 const timestamp = new Date().getTime().toString(16); // Ottieni la data corrente come stringa esadecimale
 const randomStr = Math.random().toString(16).substr(2); // Genera un numero casuale come stringa esadecimale

 return `${timestamp}-${randomStr}`;
};

const base64Conversion = (file: File): Promise<string> => {
 return new Promise((resolve, reject) => {
  var reader = new FileReader();
  reader.onload = function () {
   resolve(reader.result as string);
  };
  reader.onerror = function (error) {
   console.log("Error: ", error);
   reject();
  };
  reader.readAsDataURL(file);
 });
};

export const getBase64 = async (file: File): Promise<string> => {
 const convertedData = await base64Conversion(file);
 return convertedData;
};

export const decodeFileFromBase64 = (data: string, type: string): Blob => {
 const byteCharacters = atob(data);
 const byteNumbers = new Array(byteCharacters.length);

 for (let i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
 }

 const byteArray = new Uint8Array(byteNumbers);
 const blob = new Blob([byteArray], { type: type });
 return blob;
};

/*** Generates an alphanumeric token of a specified length.
 * @param {number} length - Length of the token (default is 10)
 * @returns {string} Random alphanumeric token
 */
export const generateToken = (length: number = 10): string => {
 const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 let token = "";
 for (let i = 0; i < length; i++) {
  token += characters.charAt(Math.floor(Math.random() * characters.length));
 }
 return token;
};

export const generateSpecialPassword = (length: number = 10): string => {
 const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 const numbers = "0123456789";
 const specials = "!@$%&()_+[]?";
 const allChars = chars + numbers + specials;

 let password = "";
 password += chars[Math.floor(Math.random() * chars.length)]; // Ensure at least one letter
 password += numbers[Math.floor(Math.random() * numbers.length)]; // Ensure at least one number
 password += specials[Math.floor(Math.random() * specials.length)]; // Ensure at least one special character

 for (let i = 3; i < length; i++) {
  password += allChars[Math.floor(Math.random() * allChars.length)];
 }

 return password
  .split("")
  .sort(() => Math.random() - 0.5)
  .join(""); // Shuffle password
};

export const generateBasePassword = (length: number = 10): string => {
 const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 const numbers = "0123456789";
 const allChars = chars + numbers;

 let password = "";
 password += chars[Math.floor(Math.random() * chars.length)]; // Ensure at least one letter
 password += numbers[Math.floor(Math.random() * numbers.length)]; // Ensure at least one number

 for (let i = 3; i < length; i++) {
  password += allChars[Math.floor(Math.random() * allChars.length)];
 }

 return password
  .split("")
  .sort(() => Math.random() - 0.5)
  .join(""); // Shuffle password
};

export const calculateDiscount = (price: number, discount: number): number => {
 return price - (price * discount) / 100;
};
