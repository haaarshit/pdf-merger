const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const merge_pdfs = async (p1, p2) => {
  await merger.add(p1);
  await merger.add(p2);
  let d = new Date().getTime()
  await merger.save(`public/${d}.pdf`)
  console.log(d)
  return d
}
module.exports = { merge_pdfs };