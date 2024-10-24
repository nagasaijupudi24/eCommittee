// /* eslint-disable react/self-closing-comp */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable no-void */
// import * as React from 'react';
// import styles from './PdfViewer.module.scss';
// import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/build/pdf.worker.mjs';
// // import "pdfjs-dist/web/pdf_viewer.css";
 
// export interface IViewPdfProps {
//   pdfUrl: string;
// }
 
// const IbViewPdf: React.FC<IViewPdfProps> = ({ pdfUrl }) => {
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const [numPages, setNumPages] = React.useState(0);
//   const [zoomLevel, setZoomLevel] = React.useState(1);
//   const [fitToPage, setFitToPage] = React.useState(false);
 
//   const loadPdf = React.useCallback(async () => {
//     if (!pdfUrl) return;
   
//     const container = containerRef.current;
//     if (!container) return;
 
//     // Clear previous rendered canvases
//     container.innerHTML = '';
 
//     // Load the PDF document
//     const pdfDocument = await pdfjsLib.getDocument(pdfUrl).promise;
//     setNumPages(pdfDocument.numPages);
 
//     const renderPage = async (pageNum: number) => {
//       const page = await pdfDocument.getPage(pageNum);
 
//       const viewport = page.getViewport({ scale: zoomLevel });
//       const canvas = document.createElement('canvas');
//       canvas.height = viewport.height;
//       canvas.width = viewport.width;
 
//       const context = canvas.getContext('2d');
//       if (context) {
//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };
//         await page.render(renderContext).promise;
 
//         // Append canvas to the container
//         container.innerHTML = ''; // Clear container before rendering new page
//         container.appendChild(canvas);
//       }
//     };
 
//     // Render the current page
//     await renderPage(currentPage);
//   }, [pdfUrl, currentPage, zoomLevel]);
 
//   React.useEffect(() => {
//     void loadPdf();
//   }, [pdfUrl, currentPage, zoomLevel, loadPdf]);
 
//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };
 
//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
//   };
 
//   const handleZoomIn = () => {
//     setZoomLevel((prevZoom) => prevZoom * 1.25);
//   };
 
//   const handleZoomOut = () => {
//     setZoomLevel((prevZoom) => prevZoom * 0.75);
//   };
 
//   const handleZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = event.target.value;
//     if (value === 'fitPage') {
//       setFitToPage(true);
//       setZoomLevel(4);
//     } else {
//       setFitToPage(false);
//       setZoomLevel(Number(value));
//     }
//   };
 
//   const handlePrint = () => {
//     window.print();
//   };
 
//   const handleSave = () => {
//     const a = document.createElement('a');
//     a.href = pdfUrl;
//     a.download = 'document.pdf';
//     a.click();
//   };
 
//   return (
//     <div className={styles.pdfViewer}>
//       {/* Toolbar */}
//       <div className="toolbar">
//         <div id="toolbarContainer">
//           <div id="toolbarViewerLeft">
//             <button
//               className="toolbarButton"
//               title="Previous Page"
//               id="previous"
//               disabled={currentPage <= 1}
//               onClick={handlePreviousPage}
//             >
//               Previous
//             </button>
//             <button
//               className="toolbarButton"
//               title="Next Page"
//               id="next"
//               disabled={currentPage >= numPages}
//               onClick={handleNextPage}
//             >
//               Next
//             </button>
//             <span className="toolbarLabel">
//               {currentPage} / {numPages}
//             </span>
//           </div>
//           <div id="toolbarViewerMiddle">
//             <div className="splitToolbarButton">
//               <button
//                 id="zoomOut"
//                 className="toolbarButton"
//                 title="Zoom Out"
//                 onClick={handleZoomOut}
//               >
//                 Zoom Out
//               </button>
//               <button
//                 id="zoomIn"
//                 className="toolbarButton"
//                 title="Zoom In"
//                 onClick={handleZoomIn}
//               >
//                 Zoom In
//               </button>
//             </div>
//             <span id="scaleSelectContainer" className="dropdownToolbarButton">
//               <select
//                 id="scaleSelect"
//                 title="Zoom"
//                 value={fitToPage ? 'fitPage' : zoomLevel.toString()}
//                 onChange={handleZoomChange}
//               >
//                 <option value="actualWidth">Actual Width</option>
//                 <option value="fitWidth">Fit to Width</option>
//                 <option value="fitPage">Fit to Page</option>
//                 <option value="0.5">50%</option>
//                 <option value="0.75">75%</option>
//                 <option value="1">100%</option>
//                 <option value="1.25">125%</option>
//                 <option value="1.5">150%</option>
//                 <option value="2">200%</option>
//                 <option value="3">300%</option>
//                 <option value="4">400%</option>
//               </select>
//             </span>
//           </div>
//           <div id="toolbarViewerRight">
//             <button
//               onClick={handlePrint}
//               id="print"
//               className="toolbarButton"
//               title="Print"
//             >
//               Print
//             </button>
 
//             <button
//               id="download"
//               className="toolbarButton"
//               title="Download"
//               onClick={handleSave}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
 
//       {/* PDF Viewer Container */}
//       <div className={styles.pdfContainer} ref={containerRef}></div>
//     </div>
//   );
 
// };
 
// export default IbViewPdf;