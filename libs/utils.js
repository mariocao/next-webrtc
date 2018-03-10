export const isClient =
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement;

export const seedGen = length => {
  var charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ9876543210qwertyuiopasdfghjklzxcvbnm";
  var i;
  var result = "";
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
    return result;
  } else
    throw new Error(
      "Your browser is outdated and can't generate secure random numbers"
    );
};
