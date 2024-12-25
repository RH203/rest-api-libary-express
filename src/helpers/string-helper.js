/**
 * Mengubah setiap kata dalam kalimat menjadi huruf kapital di awalnya.
 *
 * Fungsi ini menerima sebuah string, memecahnya menjadi kata-kata berdasarkan spasi,
 * kemudian mengubah huruf pertama dari setiap kata menjadi kapital. Hasilnya adalah
 * kalimat dengan setiap kata dimulai dengan huruf kapital.
 *
 * @param {string} input - Kalimat atau string yang ingin diubah kapitalnya.
 *
 * @returns {string} Kalimat dengan setiap kata dimulai dengan huruf kapital.
 */
function capitalizeWord(input) {
  return input
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export { capitalizeWord };
